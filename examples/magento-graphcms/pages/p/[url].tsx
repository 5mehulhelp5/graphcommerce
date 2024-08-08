import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst, InContextMaskProvider, useInContextQuery } from '@graphcommerce/graphql'
import { PageProductRows } from '@graphcommerce/graphql-gc-api'
import {
  AddProductsToCartForm,
  AddProductsToCartFormProps,
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductPageName,
  ProductPageAddToCartActionsRow,
  ProductPageBreadcrumbs,
  productPageCategory,
  ProductPageDescription,
  ProductPageGallery,
  ProductPageJsonLd,
  ProductPageMeta,
  ProductShortDescription,
  AddProductsToCartButton,
} from '@graphcommerce/magento-product'
import { defaultConfigurableOptionsSelection } from '@graphcommerce/magento-product-configurable'
import { RecentlyViewedProducts } from '@graphcommerce/magento-recently-viewed-products'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { Money, StoreConfigDocument } from '@graphcommerce/magento-store'
import { ProductWishlistChipDetail } from '@graphcommerce/magento-wishlist'
import { GetStaticProps, LayoutHeader, LayoutTitle, isTypename } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  productListRenderer,
} from '../../components'
import { AddProductsToCartView } from '../../components/ProductView/AddProductsToCartView'
import { UspsQuery } from '../../components/Usps/Usps.gql'
import { ProductPage2Document, ProductPage2Query } from '../../graphql/ProductPage2.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

export type Props = UspsQuery &
  ProductPage2Query &
  Pick<AddProductsToCartFormProps, 'defaultValues'> & { urlKey: string }

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ProductPage(props: Props) {
  const { usps, sidebarUsps, defaultValues, urlKey } = props

  const scopedQuery = useInContextQuery(ProductPage2Document, { variables: { urlKey } }, props)
  const { products } = scopedQuery.data

  const product = products?.items?.[0]

  if (!product?.sku || !product.url_key) return null

  return (
    <InContextMaskProvider mask={scopedQuery.mask}>
      <AddProductsToCartForm key={product.uid} defaultValues={defaultValues}>
        <LayoutHeader floatingMd>
          <LayoutTitle size='small' component='span'>
            <ProductPageName product={product} />
          </LayoutTitle>
        </LayoutHeader>

        <ProductPageJsonLd
          product={product}
          render={(p) => ({
            '@context': 'https://schema.org',
            ...jsonLdProduct(p),
            ...jsonLdProductOffer(p),
            ...jsonLdProductReview(p),
          })}
        />

        <ProductPageMeta product={product} />

        {import.meta.graphCommerce.breadcrumbs && (
          <ProductPageBreadcrumbs
            product={product}
            sx={(theme) => ({
              py: `calc(${theme.spacings.xxs} / 2)`,
              pl: theme.page.horizontal,
              background: theme.palette.background.paper,
              [theme.breakpoints.down('md')]: {
                '& .MuiBreadcrumbs-ol': { justifyContent: 'center' },
              },
            })}
          />
        )}

        <ProductPageGallery
          product={product}
          sx={(theme) => ({
            '& .SidebarGallery-sidebar': { display: 'grid', rowGap: theme.spacings.sm },
          })}
          disableSticky
        >
          <div>
            {isTypename(product, ['ConfigurableProduct', 'BundleProduct']) && (
              <Typography component='div' variant='body1' color='text.disabled'>
                <Trans
                  id='As low as <0/>'
                  components={{ 0: <Money {...product.price_range.minimum_price.final_price} /> }}
                />
              </Typography>
            )}
            <Typography variant='h3' component='div' gutterBottom>
              <ProductPageName product={product} />
            </Typography>
            <ProductShortDescription
              sx={(theme) => ({ mb: theme.spacings.xs })}
              product={product}
            />
            <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' />
          </div>

          <AddProductsToCartView product={product} />

          <ProductPageAddToCartActionsRow product={product}>
            <AddProductsToCartButton fullWidth product={product} />
            <ProductWishlistChipDetail {...product} />
          </ProductPageAddToCartActionsRow>

          {/* <Usps usps={sidebarUsps} size='small' /> */}

          {/* <PageProductRowsSidebar page={product.page} /> */}
        </ProductPageGallery>

        <ProductPageDescription
          product={product}
          right={<>hoi</>}
          // right={<Usps usps={usps} />}
          fontSize='responsive'
        />
      </AddProductsToCartForm>

      <PageProductRows page={product.page} product={product} />

      <RecentlyViewedProducts
        title={<Trans id='Recently viewed products' />}
        exclude={[product.sku]}
        productListRenderer={productListRenderer}
        sx={(theme) => ({ mb: theme.spacings.xxl })}
      />
    </InContextMaskProvider>
  )
}

ProductPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default ProductPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) => getProductStaticPaths(graphqlSsrClient({ locale }), locale)
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { locale, params } = context
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const urlKey = params?.url ?? '??'

  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const productQuery = await staticClient.query({
    query: ProductPage2Document,
    variables: { urlKey },
  })
  const product = productQuery.data.products?.items?.find((p) => p?.url_key === urlKey)

  if (!product) return { notFound: true }
  //return redirectOrNotFound(staticClient, conf, params, locale)

  const category = productPageCategory(product)
  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: `/`, title: i18n._(/* i18n */ 'Home') }

  return {
    props: {
      urlKey,
      ...defaultConfigurableOptionsSelection(urlKey, client, productQuery.data),
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
