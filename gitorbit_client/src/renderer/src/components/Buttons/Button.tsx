import { useState, cloneElement } from 'react'

import './Button.css'

interface ButtonProps {
  children?: string
  buttonStyle: string
  icon?: React.ReactElement
  iconStyle?: { iconHover?: string; iconColour: string; css: string }
  onMessage?: (message?: string) => void
}

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  buttonStyle,
  icon,
  iconStyle,
  onMessage
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleMouseEnter = (): void => {
    setIsHovered(true)
  }

  const handleMouseLeave = (): void => {
    setIsHovered(false)
  }

  const handleButtonClick = (): void => {
    onMessage?.()
  }

  return (
    <button
      className={`btn flex flex-row justify-center items-center ${buttonStyle}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleButtonClick}
    >
      {icon && children && (
        <div className="ml-8 flex flex-row justify-start flex-1 items-center">
          <div className={`mr-4 ${iconStyle?.css}`}>
            {cloneElement(icon, {
              className: `${isHovered ? iconStyle?.iconHover : iconStyle?.iconColour}`
            })}
          </div>
          {children && <span className="mx-4">{children}</span>}
        </div>
      )}
      {icon && !children && (
        <div className={`${iconStyle?.css}`}>
          {cloneElement(icon, {
            className: `${isHovered ? iconStyle?.iconHover : iconStyle?.iconColour}`
          })}
        </div>
      )}
      {!icon && children && <span>{children}</span>}
    </button>
  )
}

export default Button
