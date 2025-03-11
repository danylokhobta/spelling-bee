import { motion } from 'framer-motion';

function RouteWrapper({children, className, animate}) {

  const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute', // Add this line
    top: 0,
    left: 0,
    padding: '40px 10px'
  }
  const animVariants = {
    initial: { opacity: 0, x: -50, y: 0 },
    animate: { opacity: 1, x: 0, y: 0 , transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, y: 0 , transition: { duration: 0.3 } }
  };

  return (
    animate
    ?
    <motion.div
      className={`RouteWrapper ${className}`}
      style={style}
      initial="initial"
      animate="animate"
      exit='exit'
      variants={animVariants}
    >
      {children}
    </motion.div>
    :
    <div className={`RouteWrapper ${className}`} style={style}>
      {children}
    </div>
  );
}

export default RouteWrapper;
