import { InContextMaskProvider, useInContextQuery } from '@graphcommerce/graphql'
import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { productListRenderer } from '../../ProductListItems'
import { GetMagentoRowProductDocument } from './GetMagentoRowProduct.gql'
import { RowProductFragment } from './RowProduct.gql'
import { Backstory, Feature, FeatureBoxed } from './variant'

type VariantRenderer = Record<
  NonNullable<RowProductFragment['variant']>,
  React.FC<RowProductFragment & { productListItemRenderer: ProductListItemRenderer }>
>

type RowProductProps = RowProductFragment & {
  renderer?: Partial<VariantRenderer>
}

function RowProductPreview(props: RowProductFragment) {
  const { variant, identity, product } = props

  const router = useRouter()
  const canShow = router.isPreview || process.env.NODE_ENV !== 'production'
  const shouldBeRowCategory = variant === 'Grid' || variant === 'Swipeable'
  const shouldBeRowProductPage =
    variant === 'Reviews' || variant === 'Upsells' || variant === 'Related' || variant === 'Specs'
  const noProduct = !product
  if (!canShow) return null
  if (!(noProduct || shouldBeRowCategory || shouldBeRowProductPage)) return null

  return (
    <Box
      sx={(theme) => ({
        p: 2,
        m: 3,
        border: `3px dashed ${theme.palette.error.light}`,
        borderRadius: 2,
      })}
    >
      {shouldBeRowCategory && (
        <>
          RowProduct with identity ‘{identity}’ and variant ‘{variant}’, should be migrated in
          Hygraph to a RowCategory component.
        </>
      )}
      {shouldBeRowProductPage && (
        <>
          RowProduct with identity ‘{identity}’ and variant ‘{variant}’, should be migrated in
          Hygraph to a RowProductPage component.
        </>
      )}
      {!(shouldBeRowCategory || shouldBeRowProductPage) && noProduct && (
        <>
          RowProduct ({identity}) was configured with Product URL &quot;
          <code>{identity}</code>&quot;, However Magento didn&apos;t return any results.
        </>
      )}
    </Box>
  )
}

const defaultRenderer: Partial<VariantRenderer> = {
  Backstory,
  Feature,
  FeatureBoxed,
}

export function RowProduct(props: RowProductProps) {
  const { renderer, variant, product } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  const scoped = useInContextQuery(
    GetMagentoRowProductDocument,
    { variables: { urlKey: product?.url_key ?? '' }, skip: !product?.url_key },
    { products: { items: [product!] } },
  )

  if (!variant) return null

  const RenderType = mergedRenderer?.[variant]

  return (
    <InContextMaskProvider mask={scoped.mask}>
      <RowProductPreview {...props} />
      {RenderType && (
        <RenderType
          {...props}
          productListItemRenderer={productListRenderer}
          product={scoped.data.products?.items?.[0]}
        />
      )}
    </InContextMaskProvider>
  )
}
