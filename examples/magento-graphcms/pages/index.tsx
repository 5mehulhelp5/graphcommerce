import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import {
  PageDocument,
  Page,
  PageMeta,
  pageRedirectOrNotFound,
  isPageFound,
  PageRows,
} from '@graphcommerce/graphql-gc-api'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutHeader } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../components'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

type Props = Page
type RouteProps = { url: string }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function CmsPage(props: Props) {
  const { page } = props

  return (
    <>
      <PageMeta page={page} />
      <LayoutHeader floatingMd floatingSm />
      <PageRows page={page} />
    </>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CmsPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const page = client.query({ query: PageDocument, variables: { input: { href: '/' } } })
  if (!isPageFound((await page).data)) return pageRedirectOrNotFound((await page).data)

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
