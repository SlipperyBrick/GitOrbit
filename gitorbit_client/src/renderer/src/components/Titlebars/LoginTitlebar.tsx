import { useState } from 'react'

import './LoginTitlebar.css'

import Button from '@renderer/components/Buttons/Button'

import { ReactComponent as CloseIcon } from '@renderer/assets/icons/close.svg'
import { ReactComponent as MaximizeIcon } from '@renderer/assets/icons/maximize.svg'
import { ReactComponent as MinimizeIcon } from '@renderer/assets/icons/minimize.svg'

const LoginTitlebar: React.FunctionComponent = () => {
  const [isMaximized, setIsMaximized] = useState<boolean>()

  const handleCloseMessage = (): void => {
    window.api.closeWindow()
  }

  const handleMaximizeMessage = (): void => {
    window.api.maximizeWindow()
    setIsMaximized(true)
  }

  const handleRestoreMessage = (): void => {
    window.api.restoreWindow()
    setIsMaximized(false)
  }

  const handleMinimizeMessage = (): void => {
    window.api.minimizeWindow()
  }

  return (
    <div
      id="login-titlebar"
      className="z-50 absolute top-0 left-0 flex flex-row min-w-full h-12 bg-slate-800/50 backdrop-blur-[1px] select-none"
    >
      {/* Window control buttons */}
      <div className="flex flex-row flex-1 justify-end items-center">
        <Button
          buttonStyle="mx-1 w-10 h-10 active:bg-gray-900/50 hover:bg-gray-800/25 rounded transition-all duration-100 ease-in-out"
          icon={<MinimizeIcon />}
          iconStyle={{ iconColour: 'fill-white', css: 'w-3 h-3' }}
          onMessage={handleMinimizeMessage}
        />
        {isMaximized && (
          <Button
            buttonStyle="mx-1 w-10 h-10 active:bg-gray-900/50 hover:bg-gray-800/25 rounded transition-all duration-100 ease-in-out"
            icon={<MaximizeIcon />}
            iconStyle={{ iconColour: 'fill-white', css: 'w-3 h-3' }}
            onMessage={handleRestoreMessage}
          />
        )}
        {!isMaximized && (
          <Button
            buttonStyle="mx-1 w-10 h-10 active:bg-gray-900/50 hover:bg-gray-800/25 rounded transition-all duration-100 ease-in-out"
            icon={<MaximizeIcon />}
            iconStyle={{ iconColour: 'fill-white', css: 'w-3 h-3' }}
            onMessage={handleMaximizeMessage}
          />
        )}
        <Button
          buttonStyle="mx-1 w-10 h-10 active:bg-red-500 hover:bg-red-600 rounded transition-all duration-100 ease-in-out"
          icon={<CloseIcon />}
          iconStyle={{ iconColour: 'fill-white', css: 'w-3 h-3' }}
          onMessage={handleCloseMessage}
        />
      </div>
    </div>
  )
}

export default LoginTitlebar
