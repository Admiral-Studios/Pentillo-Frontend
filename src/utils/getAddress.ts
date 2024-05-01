export const getAddress = (
  homeAddressLine1?: string,
  homeAddressLine2?: string,
) => {
  if (homeAddressLine1 && homeAddressLine2) {
    return homeAddressLine1 + ' ' + homeAddressLine2
  } else if (homeAddressLine1) {
    return homeAddressLine1
  } else if (homeAddressLine2) {
    return homeAddressLine2
  } else {
    return undefined
  }
}
