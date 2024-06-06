import { motion } from 'framer-motion';

function RouteWrapper({children, className, animate}) {
  const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
  return (
    animate
    ?
    <motion.div
      className={`RouteWrapper ${className}`}
      style={style}
      transition={{duration: 1.5}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      onAnimationStart={() => {
        let elements = document.getElementsByTagName("body");
        // Loop through all elements with the tag name "div"
        for (let i = 0; i < elements.length; i++) {
          let element = elements[i];
          element.style.overflow = "hidden";
        }
      }}
      
      onAnimationComplete={() => {
        let elements = document.getElementsByTagName("body");
        // Loop through all elements with the tag name "div"
        for (let i = 0; i < elements.length; i++) {
          let element = elements[i];
          element.style.overflow = "auto";
        }
      }}
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
