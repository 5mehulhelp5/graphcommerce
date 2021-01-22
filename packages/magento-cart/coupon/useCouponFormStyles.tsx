import { makeStyles, Theme } from '@material-ui/core'

const useCouponFormStyles = makeStyles((theme: Theme) => ({
  couponForm: {
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: theme.spacings.lg,
  },
  button: {
    borderRadius: 40,
  },
}))

export default useCouponFormStyles
