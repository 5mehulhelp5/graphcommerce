import { Loader } from '@googlemaps/js-api-loader'
import { RefObject, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

type StoreLocatorMapContextType = {
  ref: RefObject<HTMLDivElement>
  map?: google.maps.Map
  additionalOptions: {
    searchQuerySuffix?: string
  }
}

const StoreLocatorMapContext = createContext<StoreLocatorMapContextType | undefined>(undefined)

type StoreLocatorMapLoaderProps = {
  mapOptions: google.maps.MapOptions
  additionalOptions: {
    searchQuerySuffix?: string
  }
  children: React.ReactNode
}

export function StoreLocatorMapLoader(props: StoreLocatorMapLoaderProps) {
  const apiKey = import.meta.graphCommerce.googleMapsApiKey
  const { mapOptions, additionalOptions, children } = props
  const mapsRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  const value: StoreLocatorMapContextType = useMemo(
    () => ({ ref: mapsRef, map, additionalOptions }),
    [additionalOptions, map],
  )

  useEffect(() => {
    if (!apiKey || !mapsRef.current)
      return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      if (!mapsRef.current) {
        console.warn('mapsRef.current is null')
        return
      }

      const loader = new Loader({ apiKey, version: 'weekly' })
      await Promise.all([loader.importLibrary('maps'), loader.importLibrary('marker')])

      setMap(new window.google.maps.Map(mapsRef.current, mapOptions))
    })()
  }, [apiKey, mapOptions])

  return <StoreLocatorMapContext.Provider value={value}>{children}</StoreLocatorMapContext.Provider>
}

export function useStoreLocatorMap() {
  const context = useContext(StoreLocatorMapContext)
  if (!context)
    throw Error('useStoreLocatorMap can only be used in children of StoreLocatorMapLoader')

  return context
}
