import { InContextMaskProvider, useInContextQuery } from '@graphcommerce/graphql'
import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { productListRenderer } from '../../ProductListItems'
import { GetMagentoRowProductPageDocument } from './GetMagentoRowProductPage.gql'
import { RowProductPageFragment } from './RowProductPage.gql'
import { Related, Reviews, Specs, Upsells } from './variant'

type VariantRenderer = Record<
  NonNullable<RowProductPageFragment['variant']>,
  React.FC<RowProductPageFragment & { productListItemRenderer: ProductListItemRenderer }>
>

type RowProductPageProps = RowProductPageFragment & {
  renderer?: Partial<VariantRenderer>
}

function RowProductPreview(props: RowProductPageFragment) {
  const { variant, identity, product } = props

  const router = useRouter()
  const canShow = router.isPreview || process.env.NODE_ENV !== 'production'
  const isWrongVariant = variant === 'Grid' || variant === 'Swipeable'
  const noProduct = !product
  if (!canShow) return null
  if (!(noProduct || isWrongVariant)) return null

  return (
    <Box
      sx={(theme) => ({
        p: 2,
        m: 3,
        border: `3px dashed ${theme.palette.error.light}`,
        borderRadius: 2,
      })}
    >
      {isWrongVariant && (
        <>
          RowProduct with identity ‘{identity}’ and variant ‘{variant}’, should be migrated in
          Hygraph to a RowCategory component.
        </>
      )}
      {!isWrongVariant && noProduct && (
        <>
          RowProduct ({identity}) was configured with Product URL &quot;
          <code>{identity}</code>&quot;, However Magento didn&apos;t return any results.
        </>
      )}
    </Box>
  )
}

const defaultRenderer: Partial<VariantRenderer> = {
  Specs,
  Related,
  Reviews,
  Upsells,
}

export function RowProduct(props: RowProductPageProps) {
  const { renderer, variant, product } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as VariantRenderer

  const scoped = useInContextQuery(
    GetMagentoRowProductPageDocument,
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
