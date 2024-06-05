import './RouteWrapper.sass';
import { motion } from 'framer-motion';

function RouteWrapper({children, className, animate}) {
  return (
    animate
    ?
    <motion.div
      className={`RouteWrapper ${className}`}
      transition={{duration: 1.5}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}

    >
      {children}
    </motion.div>
    :
    <div className={`RouteWrapper ${className}`}>
      {children}
    </div>
  );
}

export default RouteWrapper;
