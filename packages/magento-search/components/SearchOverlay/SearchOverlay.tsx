import { breakpointVal } from '@graphcommerce/next-ui'
import { LayoutHeaderClose } from '@graphcommerce/next-ui/Layout/components/LayoutHeaderClose'
import { Box, styled } from '@mui/material'
import { useState } from 'react'
import { SearchOverlayCategories } from './SearchOverlayCategories'
import { SearchInput } from './SearchOverlayInput'
import { SearchOverlayProducts } from './SearchOverlayProducts'
import { useSearchOverlay, SearchOverlayProvider } from './SearchOverlayProvider'
import { SearchOverlaySuggestions } from './SearchOverlaySuggestions'

function SearchOverlayHeader() {
  const { params } = useSearchOverlay()

  return (
    <Box
      sx={(theme) => ({
        position: 'sticky',
        display: 'grid',
        zIndex: 1,
        background: 'transparent',
        boxShadow: theme.shadows[4],
        height: theme.appShell.headerHeightSm,
        [theme.breakpoints.up('md')]: {
          height: theme.appShell.appBarHeightMd,
        },
        gap: theme.page.horizontal,
        pr: theme.page.horizontal,
        alignItems: 'center',
        gridTemplateColumns: '1fr auto auto',
      })}
    >
      <SearchInput
        inputSx={{
          typography: 'h4',
          p: 0,
        }}
        sx={(theme) => ({
          width: '100%',
          height: '100%',
          typography: 'h4',
          pl: theme.page.horizontal,
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 3,
            theme.shape.borderRadius * 4,
            theme.breakpoints.values,
          ),
          '&:focus-within': {
            boxShadow: `inset 0 0 0 2px ${theme.palette.secondary.main}`,
          },
        })}
        params={params}
        size='medium'
      />

      <LayoutHeaderClose onClose={() => {}} />
    </Box>
  )
}

const SearchOverlayBodyBase = styled('div')(({ theme }) => ({
  paddingLeft: theme.page.horizontal,
  paddingRight: theme.page.horizontal,
  pb: theme.page.vertical,
  '&:empty': { display: 'none' },
}))

export function SearchOverlay() {
  const [open, setOpen] = useState(true)

  return (
    <SearchOverlayProvider open={open} setOpen={setOpen}>
      <SearchOverlayHeader />
      <SearchOverlayBodyBase>
        <SearchOverlaySuggestions />
        <SearchOverlayCategories />
        <SearchOverlayProducts />
      </SearchOverlayBodyBase>
    </SearchOverlayProvider>
  )
}
