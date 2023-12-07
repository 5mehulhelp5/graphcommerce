import { VariantInline } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import { RowLinksProps } from '../input'

export function Inline(props: RowLinksProps) {
  const { title, pageLinks } = props

  return (
    <VariantInline title={title} maxWidth={false} sx={(theme) => ({ my: theme.spacings.md })}>
      {pageLinks.map((pageLink) => (
        <Link href={pageLink.url} key={pageLink.id} color='inherit' underline='hover'>
          {pageLink.title}
        </Link>
      ))}
    </VariantInline>
  )
}
