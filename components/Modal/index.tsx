import useClickAway from '@hooks/useClickAway';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import ReactDOM from "react-dom";

interface IProps {
  inView: boolean;
  handler: () => void;
}

const Modal: React.FC<PropsWithChildren<IProps>> = ({children, inView, handler}) => {
  const [mounted, setMounted] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useClickAway(containerRef, handler)
  
  useEffect(() => { 
    setMounted(true)
  }, [])
  
  if (!inView || mounted) return null;

  return ReactDOM.createPortal(
    <div className='fixed h-full min-h-screen w-screen bg-black/80'>
      <div ref={containerRef}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default Modal