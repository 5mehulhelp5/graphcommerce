import { useQuery } from '@apollo/client'
import { Divider, makeStyles, Theme } from '@material-ui/core'
import useRequestCartId from '@reachdigital/magento-cart/useRequestCartId'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { Money } from '@reachdigital/magento-store'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import MessageSnackbar from '@reachdigital/next-ui/Snackbar/MessageSnackbar'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import TextInputNumber from '@reachdigital/next-ui/TextInputNumber'
import { iconCheckmark, iconChevronRight } from '@reachdigital/next-ui/icons'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import PageLink from 'next/link'
import React from 'react'
import { Selected, useConfigurableContext } from '../ConfigurableContext'
import cheapestVariant from '../ConfigurableContext/cheapestVariant'
import ConfigurableOptionsInput from '../ConfigurableOptions'
import {
  ConfigurableProductAddToCartDocument,
  ConfigurableProductAddToCartMutationVariables,
} from './ConfigurableProductAddToCart.gql'

type ConfigurableProductAddToCartProps = {
  variables: Omit<ConfigurableProductAddToCartMutationVariables, 'cartId' | 'selectedOptions'>
  name: string
  optionEndLabels?: Record<string, React.ReactNode>
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacings.sm,
      width: '100%',
    },
    finalPrice: {
      ...theme.typography.h4,
      fontWeight: theme.typography.fontWeightBold,
      marginTop: theme.spacings.sm,
    },
    quantity: {
      marginTop: theme.spacings.sm,
    },
  }),
  { name: 'ConfigurableAddToCart' },
)

export default function ConfigurableProductAddToCart(props: ConfigurableProductAddToCartProps) {
  const { name, variables, optionEndLabels, ...buttonProps } = props
  const { getUids, getVariants, selection } = useConfigurableContext(variables.sku)
  const classes = useStyles()

  const requestCartId = useRequestCartId()
  const form = useFormGqlMutation(ConfigurableProductAddToCartDocument, {
    defaultValues: variables,
    onBeforeSubmit: async ({ selectedOptions, ...vars }) => ({
      ...vars,
      cartId: await requestCartId(),
      // todo: selectedOptions should contain the correct values directly
      selectedOptions: getUids((selectedOptions?.[0] as unknown) as Selected),
    }),
  })
  const { handleSubmit, formState, muiRegister, required, control, error } = form
  const submitHandler = handleSubmit(() => {})

  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const requireAuth = Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid)

  return requireAuth ? (
    <PageLink href='/account/signin' passHref>
      <Button color='primary' variant='contained' {...buttonProps}>
        Add to Cart
      </Button>
    </PageLink>
  ) : (
    <form onSubmit={submitHandler} noValidate className={classes.form}>
      <Divider />

      <ConfigurableOptionsInput
        name='selectedOptions'
        sku={variables.sku}
        control={control}
        rules={{ required: required.selectedOptions }}
        errors={formState.errors.selectedOptions}
        optionEndLabels={optionEndLabels}
      />

      <ApolloErrorAlert error={error} />

      <TextInputNumber
        variant='outlined'
        error={formState.isSubmitted && !!formState.errors.quantity}
        required={required.quantity}
        inputProps={{ min: 1 }}
        {...muiRegister('quantity', { required: required.quantity })}
        helperText={formState.isSubmitted && formState.errors.quantity?.message}
        // disabled={loading}
        size='small'
        className={classes.quantity}
      />

      <div className={classes.finalPrice}>
        <Money
          {...cheapestVariant(getVariants(selection))?.product?.price_range.minimum_price
            .final_price}
        />
      </div>

      <Button
        type='submit'
        loading={formState.isSubmitting}
        color='primary'
        variant='pill'
        size='large'
        text='bold'
        classes={{ root: classes.button }}
        {...buttonProps}
      >
        Add to Cart
      </Button>

      <MessageSnackbar
        open={formState.isSubmitSuccessful && !error?.message}
        variant='pill'
        color='default'
        action={
          <PageLink href='/cart'>
            <Button
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={
                <SvgImage
                  src={iconChevronRight}
                  shade='invert'
                  loading='eager'
                  alt='chevron right'
                />
              }
            >
              View shopping cart
            </Button>
          </PageLink>
        }
      >
        <>
          <SvgImage src={iconCheckmark} alt='checkmark' loading='eager' />
          <strong>{name}</strong>&nbsp;has been added to your shopping cart!
        </>
      </MessageSnackbar>
    </form>
  )
}
