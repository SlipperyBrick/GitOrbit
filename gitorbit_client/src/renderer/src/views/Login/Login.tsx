import './Login.css'

import Button from '@renderer/components/Buttons/Button'

import { ReactComponent as GitHubIcon } from '@renderer/assets/icons/github.svg'
import { ReactComponent as GitLabIcon } from '@renderer/assets/icons/gitlab.svg'
import { ReactComponent as GitOrbitIcon } from '@renderer/assets/icons/gitorbit-logo.svg'

const Login: React.FunctionComponent = () => {
  const handleOpenAuthorizationWindow = (link: string): void => {
    window.api.openAuthorizationWindow(link)
  }

  return (
    <div id="login-body" className="w-full min-h-screen flex flex-col select-none">
      <div className="w-auto h-auto flex flex-col flex-1 justify-center items-center">
        {/* GitOrbit logo and headings */}
        <div className="w-full mb-12 flex flex-row justify-center items-center">
          <div className="w-24 h-24 mr-3 mb-6">
            <GitOrbitIcon />
          </div>
          <div className="flex flex-col self-center">
            <h1 className="mb-3 font-poppins font-semibold text-slate-50 text-left text-6xl">
              GitOrbit
            </h1>
            <h2 className="font-poppins font-light text-slate-50 text-right text-xs">
              Embark on a stellar coding journey
            </h2>
          </div>
        </div>
        {/* Sign in heading and buttons */}
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <h1 className="mb-3 font-poppins font-semibold text-slate-50 text-lg">
            Sign in with a hosting service
          </h1>
          <Button
            buttonStyle="px-6 py-6 w-auto h-14 font-poppins font-normal text-white outline outline-2 outline-slate-50 backdrop-blur-[2px] active:outline-slate-100 active:bg-slate-100 hover:text-slate-950 hover:bg-slate-50 rounded transition duration-100 ease-in-out"
            icon={<GitLabIcon />}
            iconStyle={{
              iconColour: 'fill-slate-50',
              iconHover: 'fill-slate-950',
              css: 'w-6 h-6 -ml-8'
            }}
          >
            Sign in with GitLab
          </Button>
          <Button
            buttonStyle="px-6 py-6 w-auto h-14 font-poppins font-normal text-white outline outline-2 outline-slate-50 backdrop-blur-[2px] active:outline-slate-100 active:bg-slate-100 hover:text-slate-950 hover:bg-slate-50 rounded transition duration-100 ease-in-out"
            icon={<GitHubIcon />}
            iconStyle={{
              iconColour: 'fill-slate-50',
              iconHover: 'fill-slate-950',
              css: 'w-6 h-6 -ml-8'
            }}
            onMessage={(): void =>
              handleOpenAuthorizationWindow(
                'https://github.com/login/oauth/authorize?client_id=0d588c93ad5b1f789710&allow_signup=true'
              )
            }
          >
            Sign in with GitHub
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
