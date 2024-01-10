import cn from "classnames";
import FocusTrap from "focus-trap-react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import Button from "./Button";

export type DialogProps = {
  children?: ReactNode,
  open: boolean,
  title: string,
  onClose: () => void,
  afterClose?: () => void,
  boxClassName?: string,
  headerActions?: ReactNode
}

const Dialog = ({open, onClose, afterClose, title, children, boxClassName, headerActions}: DialogProps) => {
  
  return (
    <AnimatePresence onExitComplete={afterClose}>
      { open && (
        <FocusTrap>
            <div className="fixed inset-0 flex justify-center items-center">
              <motion.div className="fixed inset-0 bg-neutral-900" tabIndex={0} onClick={onClose} 
                initial={{opacity: 0}}
                animate={{opacity: 0.75}}
                transition={{duration: 0.1}}
                exit={{opacity: 0, transition: {duration: 0.1}}}
              />
              <motion.div 
                className={cn("relative bg-white rounded shadow p-4 min-w-[300px]", boxClassName)}
                onClick={e => e.stopPropagation()}
                initial={{y: 200, opacity: 0}}
                animate={{y: 0, opacity: 1, transition: {ease: "backOut"}}}
                exit={{y: 200, opacity: 0, transition: {ease: "easeIn", duration: 0.1}}}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-3xl font-light">{ title }</h3>
                  <div>{ headerActions }</div>
                </div>
                <div>
                  { children }
                </div>
              </motion.div>
            </div>
        </FocusTrap>
      ) }
    </AnimatePresence>
  );
}

export default Dialog;