import {
  ProductListParams,
  ProductListQuery,
  ProductFiltersPro,
  toProductListParams,
} from '@graphcommerce/magento-product'
import { useForkRef } from '@mui/material'
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import { useQuicksearch } from './useQuicksearch'

type SearchOverlayContextType = {
  params: ProductListParams
  setParams: React.Dispatch<React.SetStateAction<ProductListParams>>
  products: ProductListQuery['products']
  setClosed: () => void
}

type SearchOverlaySelectionContextType = {
  selectedIndex: number
  items: React.RefObject<HTMLElement>[]
  inputs: React.RefObject<HTMLElement>[]
  registerItem: <T extends HTMLElement>(ref: React.RefObject<T>) => () => void
  registerInput: <T extends HTMLElement>(ref: React.RefObject<T>) => () => void
}

const SearchOverlayContext = createContext<SearchOverlayContextType | undefined>(undefined)
const SearchOverlaySelectionContext = createContext<SearchOverlaySelectionContextType | undefined>(
  undefined,
)

export function useSearchOverlay() {
  const context = useContext(SearchOverlayContext)
  if (context === undefined) {
    throw new Error('useSearchOverlay must be used within a SearchOverlayProvider')
  }
  return context
}

type SearchOverlayProviderProps = {
  children: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}

export function SearchOverlayProvider(props: SearchOverlayProviderProps) {
  const { children, open, setOpen, ...overlayProps } = props
  const [params, setParams] = useState<ProductListParams>({
    filters: {},
    sort: {},
    url: 'search',
    pageSize: 8,
    currentPage: 1,
    search: '',
  })

  const { handleSubmit, products } = useQuicksearch({ params })

  const setClosed = useCallback(() => setOpen(false), [setOpen])
  const items = useRef<React.RefObject<HTMLElement>[]>([])
  const inputs = useRef<React.RefObject<HTMLElement>[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const searchOverlayContext: SearchOverlayContextType = useMemo(
    () => ({
      params,
      setParams,
      products,
      setClosed,
    }),
    [params, setParams, products, setClosed],
  )

  const searchOverlaySelectionContext: SearchOverlaySelectionContextType = useMemo(
    () => ({
      items: items.current,
      inputs: inputs.current,
      selectedIndex,
      registerItem: <T extends HTMLElement>(ref: React.RefObject<T>) => {
        if (ref.current instanceof HTMLElement) {
          items.current.push(ref as React.RefObject<HTMLElement>)
        }

        return () => {
          items.current = items.current.filter((i) => i !== ref)
        }
      },
      registerInput: <T extends HTMLElement>(ref: React.RefObject<T>) => {
        const controller = new AbortController()
        if (ref.current instanceof HTMLElement) {
          inputs.current.push(ref as React.RefObject<HTMLElement>)

          ref.current.addEventListener(
            'keydown',
            (event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()

                const newIndex = ((prevIndex) => {
                  if (prevIndex === items.current.length - 1) return -1
                  return (prevIndex + 1) % items.current.length
                })(selectedIndex)

                setSelectedIndex(newIndex)

                items.current[newIndex]?.current?.scrollIntoView({
                  behavior: 'auto',
                  block: 'center',
                })
              } else if (event.key === 'ArrowUp') {
                event.preventDefault()

                const newIndex = ((prevIndex) => {
                  if (prevIndex === -1) return items.current.length - 1
                  return (prevIndex - 1) % items.current.length
                })(selectedIndex)

                setSelectedIndex(newIndex)

                items.current[newIndex]?.current?.scrollIntoView({
                  behavior: 'auto',
                  block: 'center',
                })
              } else if (event.key === 'Enter') {
                const element = items.current[selectedIndex]?.current
                element?.click()
              } else {
                setSelectedIndex(-1)
              }
            },
            { signal: controller.signal },
          )
        }
        return () => {
          inputs.current = inputs.current.filter((i) => i !== ref)
          controller.abort()
        }
      },
    }),
    [selectedIndex],
  )

  return (
    <SearchOverlayContext.Provider value={searchOverlayContext}>
      <SearchOverlaySelectionContext.Provider value={searchOverlaySelectionContext}>
        <ProductFiltersPro
          params={params}
          filterTypes={{}}
          autoSubmitMd
          handleSubmit={(formValues) =>
            // eslint-disable-next-line @typescript-eslint/require-await
            handleSubmit(formValues, async () => {
              setParams(toProductListParams(formValues))
            })
          }
        >
          {children}
        </ProductFiltersPro>
      </SearchOverlaySelectionContext.Provider>
    </SearchOverlayContext.Provider>
  )
}

export function useSearchOverlaySelection() {
  const context = useContext(SearchOverlaySelectionContext)
  if (context === undefined) {
    throw new Error(
      'useSearchOverlaySelection must be used within a SearchOverlaySelectionContext.Provider',
    )
  }
  return context
}

export function useSearchItem({ rootRef }: { rootRef?: React.Ref<Element> }) {
  const searchOverlay = useSearchOverlaySelection()

  const internalRef = useRef<HTMLElement>(null)
  const forkedRef = useForkRef(rootRef, internalRef)
  const register = searchOverlay.registerItem
  useEffect(() => register(internalRef), [register, rootRef])

  return {
    getRootProps: () => ({
      ref: forkedRef,
      selected:
        searchOverlay.selectedIndex > -1 &&
        searchOverlay.selectedIndex === searchOverlay.items.indexOf(internalRef),
    }),
  }
}

export function useSearchInput({ rootRef }: { rootRef?: React.Ref<Element> }) {
  const searchOverlay = useSearchOverlaySelection()

  const internalRef = useRef<HTMLElement>(null)
  const forkedRef = useForkRef(rootRef, internalRef)
  const register = searchOverlay.registerInput
  useEffect(() => register(internalRef), [register, rootRef])

  return {
    getRootProps: () => ({
      selected: searchOverlay.selectedIndex === -1,
      ref: forkedRef,
    }),
  }
}
