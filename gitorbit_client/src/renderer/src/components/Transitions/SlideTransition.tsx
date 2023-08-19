import './SlideTransition.css'

import { motion } from 'framer-motion'
import { ComponentType, ReactElement } from 'react'

const SlideTransition = (WrappedComponent: ComponentType): React.FunctionComponent => {
  const ComponentWithTransition: React.FunctionComponent = (): ReactElement => (
    <>
      <WrappedComponent />

      <motion.div
        className="slide-in"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-out"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  )

  return ComponentWithTransition
}

export default SlideTransition
