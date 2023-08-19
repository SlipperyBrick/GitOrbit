import { createHashRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import configureStore from '@renderer/store/store'

import RootLayout from '@layouts/RootLayout'

import Login from '@views/Login/Login'
import Dashboard from '@views/Dashboard/Dashboard'

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
)

const App: React.FunctionComponent = () => {
  return (
    <Provider store={configureStore}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
