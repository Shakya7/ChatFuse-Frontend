
function ModalContainer(props) {
  return (
    <div className='fixed overflow-hidden top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center'>
    {props.children}
    </div>
  )
}

export default ModalContainer