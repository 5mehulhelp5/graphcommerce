import { ApolloError } from '@graphcommerce/graphql'
import { ErrorSnackbar, ErrorSnackbarProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'

export type ApolloErrorSnackbarProps = {
  error?: ApolloError
} & Pick<ErrorSnackbarProps, 'action' | 'onClose'>

export function ApolloErrorSnackbar(props: ApolloErrorSnackbarProps) {
  const { error, action, ...passedProps } = props
  const isDevMode = process.env.NODE_ENV === 'development'

  if (!error) return null
  return (
    <ErrorSnackbar variant='pill' severity='error' {...passedProps} open={!!error}>
      <>
        {error.graphQLErrors.map((e) => e.message).join(', ')}
        {isDevMode ? (
          <>{error.networkError && <>Network Error: {error.networkError.message}</>}</>
        ) : (
          <Trans id='Something went wrong. Please try again later.' />
        )}
      </>
    </ErrorSnackbar>
  )
}
