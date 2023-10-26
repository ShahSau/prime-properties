// framer motion
import { motion } from 'framer-motion'

// variants
const transitionVariants = {
  initial: {
    x: '100%',
    width: '100%',
  },
  animate: {
    x: '0%',
    width: '0%',
  },
  exit: {
    x: ['0%', '100%'],
    width: ['0%', '100%'],
  },
}

const Transition = () => {
  return (
    <>
      <motion.div
        className='fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-[#f5249e]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}
      ></motion.div>
      <motion.div
        className='fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-[#3b2d71]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeInOut' }}
      ></motion.div>
      <motion.div
        className='fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-[#4b3792]'
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.6, duration: 0.6, ease: 'easeInOut' }}
      ></motion.div>
      {/* <motion.div
        className='fixed top-0 left-0 w-full h-screen origin-bottom'
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ delay: 0.6, duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className='fixed top-0 left-0 w-full h-screen origin-top'
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ delay: 0.6, duration: 2, ease: [0.22, 1, 0.36, 1] }}
      /> */}
    </>
  )
}

export default Transition
