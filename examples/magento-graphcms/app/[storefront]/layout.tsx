import { GraphqlAppProvider } from '@graphcommerce/graphql'
import { graphqlSharedClient } from '@graphcommerce/graphql-mesh'
import { setConfigContext, storefrontConfig } from '@graphcommerce/next-ui/server'
import { i18n, Messages } from '@lingui/core'
import * as all from 'make-plural/plurals'
import { RootLayoutClient } from './RootLayoutClient'
import { LayoutProps } from './types'

// Generate static parameters for the storefront
export const generateStaticParams = () =>
  import.meta.graphCommerce.storefront.map((storefront) => ({ params: { storefront } }))

// Load pluralization rules for a specific locale
function loadPluralRulesForLocale(locale: string) {
  const pluralRules = all[locale]

  if (pluralRules) {
    i18n.loadLocaleData({
      [locale]: { plurals: pluralRules },
    })
  }
}

// Load localization data for the given linguiLocale
async function loadLocaleData(linguiLocale: string) {
  const localisationConfig: { messages: Messages } = await import(
    `../../locales/${linguiLocale}.po`
  )
  i18n.load(linguiLocale, localisationConfig.messages)

  // Load pluralization rules for the current locale
  loadPluralRulesForLocale(linguiLocale)

  i18n.activate(linguiLocale)

  return localisationConfig.messages
}

// RootLayout component responsible for rendering the page layout
export default async (props: LayoutProps) => {
  setConfigContext(props)
  const { children } = props

  const config = storefrontConfig()
  const linguiLocale = config.linguiLocale ?? config.locale.split('-')[0]
  const messages = await loadLocaleData(linguiLocale)
  // const apolloState = getApolloState(config.locale)

  return (
    <html lang={props.params.storefront}>
      <head />
      <GraphqlAppProvider>
        <RootLayoutClient
          // locale={config.locale}
          messages={messages}
          linguiLocale={linguiLocale}
        >
          {children}
        </RootLayoutClient>
      </GraphqlAppProvider>
    </html>
  )
}
