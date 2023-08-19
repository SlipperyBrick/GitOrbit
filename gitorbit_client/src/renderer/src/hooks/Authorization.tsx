import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

interface AuthorizationHookResponse {
  authorizationCode: string | null
}

const useAuthorization = (): AuthorizationHookResponse => {
  const [authorizationCode, setAuthorizationCode] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthorizationCode = (_event: Electron.IpcRendererEvent, code: string): void => {
      setAuthorizationCode(code)
    }

    window.api.receiveAuthorizationCode(handleAuthorizationCode)

    return () => {
      window.api.removeAuthorizationCodeListener(handleAuthorizationCode)
    }
  }, [])

  useEffect(() => {
    if (authorizationCode && !localStorage.getItem('accessToken')) {
      handleGetAccessToken()
    } else if (localStorage.getItem('accessToken')) {
      navigate('/dashboard')
    }
  }, [authorizationCode])

  async function handleGetAccessToken(): Promise<void> {
    await fetch('http://localhost:4000/getAccessToken?code=' + authorizationCode, {
      method: 'GET'
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)

        if (data.access_token) {
          localStorage.setItem('accessToken', data.access_token)

          navigate('dashboard')
        }
      })
  }

  return {
    authorizationCode
  }
}

export default useAuthorization
