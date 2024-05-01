// Import necessary modules and constants
import axios from 'axios';
import { NAV_LINKS } from '@/utils/constants/nav';
import { baseUrl } from '../utils/constants/baseUrl';

// Create Axios instance
const axiosApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-type': 'application/json',
  },
});

// Create Axios instance
export const axiosInvitationApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-type': 'application/json',
  },
});

// Function to refresh token
function refreshToken() {
  return axiosApi.get('/auth/refresh')
    .then(response => {
      // Extract new token from the response
      const newToken = response.data.token;
      // Update token in your authentication logic
      // For example:
      // updateToken(newToken);
      return newToken;
    })
    .catch(refreshError => {
      // Redirect to sign-in page if token refresh fails
      console.error('Token refresh failed:', refreshError);
      window.location.href = NAV_LINKS.SIGN_IN;
      return Promise.reject(refreshError);
    });
}

// Interceptor to handle 401 errors and retry with token refresh
axiosApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      // Exclude token refresh request from interception
      if (originalRequest.url === '/auth/refresh') {
        console.error('Token refresh request failed');
        window.location.href = NAV_LINKS.SIGN_IN;
        return Promise.reject(error);
      }
      
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        return refreshToken()
          .then(newToken => {
            // Retry the original request with the new token
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axiosApi(originalRequest);
          })
          .catch(refreshError => {
            // Redirect to sign-in page if token refresh fails after retry
            console.error('Token refresh failed after retry');
            window.location.href = NAV_LINKS.SIGN_IN;
            return Promise.reject(refreshError);
          });
      } else {
        // Redirect to sign-in page if token refresh fails after retry
        console.error('Token refresh failed after retry');
        window.location.href = NAV_LINKS.SIGN_IN;
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosApi;
