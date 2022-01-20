import { styled, SxProps, Theme } from '@mui/material'
import { m } from 'framer-motion'
import { forwardRef } from 'react'
import { ScrollableProps, useScroller } from '../hooks/useScroller'

const ScrollerDiv = styled(m.div)({})

const Scroller = forwardRef<HTMLDivElement, ScrollableProps & { sx?: SxProps<Theme> }>(
  (props, forwardedRef) => {
    const { sx, ...scrollerProps } = props
    const scroller = useScroller<'div'>({ grid: true, ...scrollerProps }, forwardedRef)
    return <ScrollerDiv {...scroller} sx={sx} />
  },
)
Scroller.displayName = 'Scroller'

export default Scroller
