import React, { useEffect, useState } from 'react'

interface UseLocalStorage<T> {
  storedValue: T
  setValue: (value: T | ((val: T) => T)) => void
}

function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorage<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue: UseLocalStorage<T>['setValue'] = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window === 'undefined') {
        return
      }

      try {
        const item = window.localStorage.getItem(key)
        setStoredValue(item ? JSON.parse(item) : initialValue)
      } catch (error) {
        console.error(error)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue])

  return { storedValue, setValue }
}

export default useLocalStorage
