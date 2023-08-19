import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import './AppTitlebar.css'

import Button from '@components/Buttons/Button'
import Dropdown from '@components/Dropdowns/Dropdown'

import { ReactComponent as HomeIcon } from '@renderer/assets/icons/home.svg'
import { ReactComponent as WorkspaceIcon } from '@renderer/assets/icons/workspaces.svg'
import { ReactComponent as BoardsIcon } from '@renderer/assets/icons/boards.svg'
import { ReactComponent as CloseIcon } from '@renderer/assets/icons/close.svg'
import { ReactComponent as MaximizeIcon } from '@renderer/assets/icons/maximize.svg'
import { ReactComponent as MinimizeIcon } from '@renderer/assets/icons/minimize.svg'

import useUserData from '@renderer/hooks/UserData'

const AppTitlebar: React.FunctionComponent = () => {
  const navigate = useNavigate()

  const { userData } = useUserData()

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

  const handleExternalLink = (
    event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLImageElement>
  ): void => {
    event.preventDefault()
    window.api.openExternalLink(userData?.html_url)
  }

  const handleSelectedOption = (option: string): void => {
    switch (option) {
      case 'Preferences': {
        console.log('Preferences has been selected')
        break
      }
      case 'Support': {
        console.log('Support page is loaded')
        break
      }
      case 'Sign Out': {
        localStorage.removeItem('accessToken')
        navigate('/')
        break
      }
    }
  }

  const handleKeyGeneration = (): string => {
    return uuidv4()
  }

  return (
    <div
      id="app-titlebar"
      className="z-50 absolute top-0 left-0 flex flex-row min-w-full h-12 select-none"
    >
      {/* View buttons */}
      <div className="flex flex-row flex-1 justify-start items-center">
        <Button
          buttonStyle="mx-1 w-10 h-10 active:bg-slate-900/50 hover:bg-slate-800/25 rounded transition-all duration-100 ease-in-out"
          icon={<HomeIcon />}
          iconStyle={{ iconColour: 'fill-white', css: 'w-7 h-7' }}
        />
        <Button
          buttonStyle="mx-1 w-10 h-10 active:bg-slate-900/50 hover:bg-slate-800/25 rounded transition-all duration-100 ease-in-out"
          icon={<WorkspaceIcon />}
          iconStyle={{ iconColour: 'fill-white', css: 'w-7 h-7' }}
        />
        <Button
          buttonStyle="mx-1 w-10 h-10 active:bg-slate-900/50 hover:bg-slate-800/25 rounded transition-all duration-100 ease-in-out"
          icon={<BoardsIcon />}
          iconStyle={{ iconColour: 'fill-white', css: 'w-7 h-7' }}
        />
      </div>
      {/* User avatar buttons */}
      <div className="flex flex-row flex-1 justify-end items-center">
        <div
          id="user-avatar"
          className="px-1 py-1 mr-11 flex flex-row justify-center items-center bg-slate-800/25 hover:bg-slate-800/30 rounded backdrop-blur-sm transition-all duration-100 ease-in-out"
        >
          <img
            className="w-8 h-8 rounded cursor-pointer hover:drop-shadow-sm hover:brightness-105 transition-all duration-100 ease-in-out"
            src={userData?.avatar_url}
            onClick={handleExternalLink}
          />
          {userData && (
            <Dropdown
              label={userData?.login}
              options={[
                {
                  key: 'username_' + handleKeyGeneration(),
                  value: userData?.email === null ? userData?.login : userData.email
                },
                { key: 'preferences_' + handleKeyGeneration(), value: 'Preferences' },
                { key: 'support_' + handleKeyGeneration(), value: 'Support' },
                { key: 'signout_' + handleKeyGeneration(), value: 'Sign Out' }
              ]}
              dropdownSize="w-64 h-auto"
              onOptionSelect={handleSelectedOption}
            />
          )}
        </div>
        {/* Window control buttons */}
        <Button
          buttonStyle="mx-1 w-10 h-10 active:bg-slate-900/50 hover:bg-slate-800/25 rounded transition-all duration-100 ease-in-out"
          icon={<MinimizeIcon />}
          iconStyle={{ iconColour: 'fill-slate-50', css: 'w-3 h-3' }}
          onMessage={handleMinimizeMessage}
        />
        {isMaximized && (
          <Button
            buttonStyle="mx-1 w-10 h-10 active:bg-slate-900/50 hover:bg-slate-800/25 rounded transition-all duration-100 ease-in-out"
            icon={<MaximizeIcon />}
            iconStyle={{ iconColour: 'fill-slate-50', css: 'w-3 h-3' }}
            onMessage={handleRestoreMessage}
          />
        )}
        {!isMaximized && (
          <Button
            buttonStyle="mx-1 w-10 h-10 active:bg-slate-900/50 hover:bg-slate-800/25 rounded transition-all duration-100 ease-in-out"
            icon={<MaximizeIcon />}
            iconStyle={{ iconColour: 'fill-slate-50', css: 'w-3 h-3' }}
            onMessage={handleMaximizeMessage}
          />
        )}
        <Button
          buttonStyle="mx-1 w-10 h-10 active:bg-red-500 hover:bg-red-600 rounded transition-all duration-100 ease-in-out"
          icon={<CloseIcon />}
          iconStyle={{ iconColour: 'fill-slate-50', css: 'w-3 h-3' }}
          onMessage={handleCloseMessage}
        />
      </div>
    </div>
  )
}

export default AppTitlebar
