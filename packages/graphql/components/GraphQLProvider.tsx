'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloLink,
  InMemoryCache,
  TypePolicies,
  ApolloProvider,
  HttpLink,
} from '../apollo'
import { createCacheReviver } from '../createCacheReviver'
import { errorLink } from '../errorLink'
import fragments from '../generated/fragments.json'
import { measurePerformanceLink } from '../measurePerformanceLink'
import { MigrateCache } from '../migrateCache'
import { mergeTypePolicies } from '../typePolicies'
import { StrictTypedTypePolicies } from '../index.interceptor'

export const globalApolloClient: { current: ApolloClient<NormalizedCacheObject> | null } = {
  current: null,
}

export type GraphQLProviderProps = {
  apolloState?: NormalizedCacheObject

  locale?: string

  children: React.ReactNode
  /** Additional ApolloLink to add to the chain. */
  links?: ApolloLink[]
  /**
   * This is a list of type policies which are used to influence how cache is handled.
   * https://www.apollographql.com/docs/react/caching/cache-field-behavior/
   */
  policies?: StrictTypedTypePolicies[]
  /**
   * To upgrade the local storage to a new version when the app is updated, but the client isn't
   * yet, we run these migrations.
   */
  migrations?: MigrateCache[]
}

/**
 * The GraphQLProvider allows us to configure the ApolloClient and provide it to the rest of the
 * app. This component is heavily intercepted by various plugins.
 *
 * Take a look at the props to see possible customization options.
 */
export function GraphQLProvider(props: GraphQLProviderProps) {
  const { children, policies = [], migrations = [], links = [], apolloState } = props
  const state = apolloState

  const stateRef = useRef(state)

  const linksRef = useRef(links)
  const policiesRef = useRef(policies)

  const createCache = useCallback(
    () =>
      new InMemoryCache({
        possibleTypes: fragments.possibleTypes,
        typePolicies: mergeTypePolicies(policiesRef.current),
      }),
    [],
  )

  const [client] = useState(() => {
    const link = ApolloLink.from([
      ...(typeof window === 'undefined' ? [errorLink, measurePerformanceLink] : []),
      ...linksRef.current,
      // The actual Http connection to the Mesh backend.
      new HttpLink({ uri: '/api/graphql', credentials: 'same-origin' }),
    ])

    const cache = createCache()
    if (stateRef.current) cache.restore(stateRef.current)

    const ssrMode = typeof window === 'undefined'
    return new ApolloClient({ link, cache, name: 'web', ssrMode })
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    createCacheReviver(client, createCache, policies, migrations, state)
  }, [client, createCache, migrations, policies, state])

  globalApolloClient.current = client

  return <ApolloProvider client={globalApolloClient.current}>{children}</ApolloProvider>
}
