// hooks
import { createContext, useEffect, useState } from 'react'

// Types
type loaderContext = {
  isLoading: boolean | null
  setIsLoading: (isLoading: boolean) => void
}

// init context
export const LoaderContext = createContext<loaderContext | null>(null)

export const LoaderProvider = ({ children }) => {
  // state
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer: number = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  )
}
