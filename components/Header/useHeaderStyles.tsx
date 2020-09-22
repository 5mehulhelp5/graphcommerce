import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { vpCalc } from 'components/Theme'

const useHeaderStyles = makeStyles(
  ({ spacings, zIndex }: Theme) => ({
    navigation: {
      position: 'fixed',
      top: 0,
      display: 'grid',
      gridTemplateAreas: `'menu logo secondary'`,
      padding: `${spacings.md} ${spacings.sm}`,
      gridTemplateColumns: `minmax(46px, 1fr) auto minmax(calc(46px * 3), 1fr)`,
      gridTemplateRows: `auto`,
      justifyItems: 'center',
      width: '100%',
      zIndex: zIndex.appBar,
      // 2x spacing.md, Logo Height, Logo Margin
      marginBottom: `calc(${spacings.md} * -2 + ${vpCalc(46, 72)} * -1 - 3px)`,
      pointerEvents: 'none',
    },
    logo: {
      gridArea: 'logo',
      pointerEvents: 'all',
    },
    logoImg: {
      maxHeight: vpCalc(46, 72),
      display: 'block',
      marginTop: 3,
      width: 'auto',
      height: 'auto',
    },
    menu: {
      gridArea: 'menu',
      pointerEvents: 'all',
      justifySelf: 'flex-start',
    },
    secondary: {
      gridArea: 'secondary',
      justifySelf: 'flex-end',
      '& > * > *': {
        pointerEvents: 'all',
      },
    },
  }),
  { name: 'Header' },
)

export default useHeaderStyles
