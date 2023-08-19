import { Outlet } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'

import LoginTitlebar from '@renderer/components/Titlebars/LoginTitlebar'
import AppTitlebar from '@renderer/components/Titlebars/AppTitlebar'

import useAuthorization from '@renderer/hooks/Authorization'

const RootLayout: React.FunctionComponent = () => {
  useAuthorization()

  return (
    <>
      {localStorage.getItem('accessToken') !== null ? <AppTitlebar /> : <LoginTitlebar />}
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
    </>
  )
}

export default RootLayout
