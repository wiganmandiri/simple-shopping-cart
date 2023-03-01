import React, { useEffect, useRef } from 'react'

const Modals = ({
  isOpen,
  setIsOpen,
  children
}: any) => {

  const ref: any = useRef()

  useEffect(() => {
    if (isOpen) {
      const checkIfClickedOutside = (e: any) => {
        if (isOpen && ref.current && !ref.current.contains(e.target)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", checkIfClickedOutside)
      }
    }
  }, [isOpen]) //eslint-disable-line

  return isOpen && (
    <div className='fixed z-[99] inset-0 w-screen bg-black bg-opacity-50 backdrop-blur-sm'>
      <div className='flex items-center justify-center w-full p-10'>
        <div ref={ref} className="w-full md:w-[30rem] lg:w-[40rem]">
          {children}
        </div>
      </div>
    </div>
  )
}
export default Modals