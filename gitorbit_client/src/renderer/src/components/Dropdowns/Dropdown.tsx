import { useState, useEffect, useRef } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'

import './Dropdown.css'

interface DropdownProps {
  label: string
  options: { key: string; value: string }[]
  dropdownSize: string
  onOptionSelect: (option: string) => void
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  label,
  options,
  dropdownSize,
  onOptionSelect
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [showPing, setShowPing] = useState<boolean>(true)

  const handleClickOutside = (event: MouseEvent): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsExpanded(false)
    }
  }

  // Handle a click from outside the dropdown div element
  useEffect(() => {
    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleOptionSelect = (option: string): void => {
    onOptionSelect(option)
    setIsExpanded(false)
  }

  const handleKeyGeneration = (): string => {
    return uuidv4()
  }

  return (
    <>
      {/* Ping animation */}
      {showPing === true && (
        <span className="absolute flex flex-row h-3 w-3 top-0 right-0 -mt-0.75 -mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      )}
      <button
        className={`mx-2 flex flex-row justify-center items-center font-poppins font-light text-xs text-slate-50 btn hover:text-slate-200 transition duration-250 ease-in-out
        }`}
        onClick={(event: React.MouseEvent): void => {
          isExpanded ? setIsExpanded(false) : setIsExpanded(true)
          event.stopPropagation()
          if (showPing === true) {
            setShowPing(false)
          }
        }}
      >
        {label}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={dropdownRef}
            className={`mt-2 py-2 absolute top-9 left-0 ${dropdownSize} outline outline-1 outline-[#1B1D22] bg-[#272A31] rounded drop-shadow-md `}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.1 }}
          >
            <ul className="select-none">
              <li
                className="px-4 py-2 font-poppins font-light text-sm text-slate-50"
                key={options[0].key}
              >
                Signed in as
                <span className="mb-1 block font-poppins font-medium text-sm text-slate-50">
                  {options[0].value}
                </span>
              </li>
              <hr className="my-1 h-1 border-[#1B1D22]" />
              {options.slice(1).map((option, index) =>
                index === 2 ? (
                  <>
                    <hr className="my-2 w-full h-1 border-[#1B1D22]" key={handleKeyGeneration()} />
                    <li
                      className="-mt-1 px-4 py-2 font-poppins font-light text-sm text-slate-50 transition duration-75 ease-in-out hover:bg-[#32353C] cursor-pointer"
                      onClick={(): void => {
                        handleOptionSelect(option.value)
                      }}
                      key={option.key}
                    >
                      {option.value}
                    </li>
                  </>
                ) : (
                  <li
                    className="px-4 py-2 font-poppins font-light text-sm text-slate-50 transition duration-75 ease-in-out hover:bg-[#32353C] cursor-pointer"
                    onClick={(): void => {
                      handleOptionSelect(option.value)
                    }}
                    key={option.key}
                  >
                    {option.value}
                  </li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Dropdown
