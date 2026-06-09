import { createPortal } from 'react-dom';

function ModalContainer(props) {
  return createPortal(
    <div className='fixed overflow-hidden top-0 left-0 w-screen h-screen backdrop-blur-sm z-[9999] flex justify-center items-center'>
      {props.children}
    </div>,
    document.body
  );
}

export default ModalContainer