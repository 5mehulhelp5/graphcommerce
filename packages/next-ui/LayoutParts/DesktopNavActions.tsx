import { Box, styled } from '@mui/material'

export const DesktopNavActions = styled(Box, { name: 'DesktopNavActions' })(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'grid',
    pointerEvents: 'none !important' as 'none',
    '& > *': {
      pointerEvents: 'all',
    },
    alignItems: 'center',
    gridAutoFlow: 'column',
    columnGap: 6,
  },
}))
