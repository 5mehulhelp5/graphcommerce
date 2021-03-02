import { makeStyles } from '@material-ui/core'
import { m, MotionProps } from 'framer-motion'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles(
  {
    container: {
      overflow: 'hidden',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  { name: 'SliderContainer' },
)

export type SliderContainerProps = MotionProps &
  UseStyles<typeof useStyles> & { children: React.ReactNode }

export default function SliderContainer(props: SliderContainerProps) {
  const { children, ...divProps } = props
  const classes = useStyles(props)
  const [state] = useSliderContext()

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <m.div ref={state.containerRef} className={classes.container} tabIndex={0} {...divProps}>
      {children}
    </m.div>
  )
}
