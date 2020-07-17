import { PageTransitionPair, exitTime, entryTime } from './index'

const overlay: PageTransitionPair = {
  background: {
    initial: { scale: 0.95, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: 'tween', duration: exitTime, ease: 'easeOut' },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: { type: 'tween', duration: entryTime, ease: 'easeIn' },
    },
  },
  foreground: {
    initial: { y: '100%', opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: 'tween', duration: entryTime, ease: 'easeOut' },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: { type: 'tween', duration: exitTime, ease: 'easeIn' },
    },
  },
}

export default overlay
