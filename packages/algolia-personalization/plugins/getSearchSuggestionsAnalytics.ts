import type { getSearchSuggestionsInput as getSearchSuggestionsInputType } from '@graphcommerce/algolia-mesh'
import { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { getUserToken } from '../mesh/getUserToken'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/algolia-mesh',
  ifConfig: 'algolia.analyticsEnabled',
}

export const getSearchSuggestionsInput: FunctionPlugin<
  typeof getSearchSuggestionsInputType
> = async (prev, search, context) => ({
  ...(await prev(search, context)),
  clickAnalytics: true,
  analytics: true,
  userToken: getUserToken(context),
})
