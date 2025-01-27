import { iconLocation, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { Box, Link, Typography } from '@mui/material'
import type { TrackingLinkFragment } from './TrackingLink.gql'

export type TrackingLinkProps = TrackingLinkFragment & { sx?: SxProps<Theme> }

export function TrackingLink(props: TrackingLinkProps) {
  const { number, sx = [] } = props

  const validUrl = number?.startsWith('http://') || number?.startsWith('https://')

  return (
    <Box
      className='TrackingLink-root'
      sx={[
        (theme) => ({
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.primary.main,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {number && validUrl && (
        <Link
          onClick={(e) => e.stopPropagation()}
          href={number}
          target='_blank'
          underline='hover'
          sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <IconSvg src={iconLocation} size='small' />
          <Trans id='Follow order' />
        </Link>
      )}

      {number && !validUrl && <Typography>{number}</Typography>}
    </Box>
  )
}
