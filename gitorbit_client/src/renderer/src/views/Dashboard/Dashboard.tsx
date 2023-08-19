import './Dashboard.css'

import Button from '@renderer/components/Buttons/Button'
import Section from '@components/Sections/Section'

import { ReactComponent as FolderIcon } from '@assets/icons/home.svg'
import { ReactComponent as CloneIcon } from '@assets/icons/clone.svg'
import { ReactComponent as NewIcon } from '@assets/icons/new.svg'
import { ReactComponent as BoardIcon } from '@assets/icons/boards.svg'
import { ReactComponent as RepositoryIcon } from '@assets/icons/repositories.svg'
import { ReactComponent as WorkspaceIcon } from '@assets/icons/workspaces.svg'
import { ReactComponent as TerminalIcon } from '@assets/icons/terminal.svg'
import { ReactComponent as DesktopIcon } from '@assets/icons/desktop.svg'
import { ReactComponent as GitHubIcon } from '@assets/icons/github.svg'
import { ReactComponent as GitLabIcon } from '@assets/icons/gitlab.svg'
import { ReactComponent as AzureIcon } from '@assets/icons/azure.svg'

const Dashboard: React.FunctionComponent = () => {
  const handleOpenRepo = (): void => {}
  const handleCloneRepo = (): void => {}
  const handleOpenWorkspace = (): void => {}
  const handleNewWorkspace = (): void => {}
  const handleNewTerminal = (): void => {}
  const handleOpenBoard = (): void => {}
  const handleNewBoard = (): void => {}

  return (
    <div
      id="dashboard-body"
      className="w-full min-h-screen flex flex-col justify-center items-stretch select-none"
    >
      {/* First row of sections */}
      <div className="mt-24 flex flex-row justify-center items-center gap-x-4">
        <Section
          heading="Repositories"
          icon={<RepositoryIcon />}
          paragraph="Clone remote repos through your favourite hosting services, or access local repos. If you
        are working on multiple repos, try Workspaces."
          buttons={[
            { buttonLabel: 'Open a repo', buttonIcon: <FolderIcon />, onMessage: handleOpenRepo },
            { buttonLabel: 'Clone a repo', buttonIcon: <CloneIcon />, onMessage: handleCloneRepo }
          ]}
        />
        <Section
          heading="Workspaces"
          icon={<WorkspaceIcon />}
          paragraph="Take control over the repos you work with the most by setting up a Workspace."
          buttons={[
            {
              buttonLabel: 'Open a Workspace',
              buttonIcon: <WorkspaceIcon />,
              onMessage: handleOpenWorkspace
            },
            { buttonLabel: 'New Workspace', buttonIcon: <NewIcon />, onMessage: handleNewWorkspace }
          ]}
        />
        <Section
          heading="Terminal"
          icon={<TerminalIcon />}
          paragraph="Working with the terminal when using Git? Get an upgrade with visualisations and autocomplete in an interactive environment"
          buttons={[
            { buttonLabel: 'New Terminal', buttonIcon: <NewIcon />, onMessage: handleNewTerminal }
          ]}
        />
      </div>
      {/* Second row of sections */}
      <div className="flex flex-row justify-center items-center gap-x-4">
        <div className="flex flex-col mx-1 px-4 w-1/4 h-auto">
          <h1 className="font-poppins font-normal text-slate-50 text-md">Create a repository</h1>
          <div className="flex flex-row justify-start">
            <Button
              buttonStyle="my-2 mr-2 w-12 h-12 bg-[#272A31] font-poppins font-normal text-white text-sm rounded drop-shadow-sm hover:bg-[#2D3139] active:bg-[#383B41] transition duration-100 ease-in-out"
              icon={<DesktopIcon />}
              iconStyle={{ iconColour: 'fill-slate-50', css: 'w-5 h-5' }}
            />
            <Button
              buttonStyle="my-2 mr-2 w-12 h-12 bg-[#272A31] font-poppins font-normal text-white text-sm rounded drop-shadow-sm hover:bg-[#2D3139] active:bg-[#383B41] transition duration-100 ease-in-out"
              icon={<GitHubIcon />}
              iconStyle={{ iconColour: 'fill-slate-50', css: 'w-5 h-5' }}
            />
            <Button
              buttonStyle="my-2 mr-2 w-12 h-12 bg-[#272A31] font-poppins font-normal text-white text-sm rounded drop-shadow-sm hover:bg-[#2D3139] active:bg-[#383B41] transition duration-100 ease-in-out"
              icon={<GitLabIcon />}
              iconStyle={{ iconColour: 'fill-slate-50', css: 'w-5 h-5' }}
            />
            <Button
              buttonStyle="my-2 w-12 h-12 bg-[#272A31] font-poppins font-normal text-white text-sm rounded drop-shadow-sm hover:bg-[#2D3139] active:bg-[#383B41] transition duration-100 ease-in-out"
              icon={<AzureIcon />}
              iconStyle={{ iconColour: 'fill-slate-50', css: 'w-5 h-5' }}
            />
          </div>
        </div>
        {/* Empty containers to ensure each row with the main container aligns correctly */}
        <div className="flex flex-col mx-1 px-4 w-1/4 h-auto"></div>
        <div className="flex flex-col mx-1 px-4 w-1/4 h-auto"></div>
      </div>
      {/* Third row of sections */}
      <div className="flex flex-row justify-center items-center gap-x-4">
        <div className="flex flex-col mx-1 px-4 py-16 w-1/4 h-72">
          <h1 className="font-poppins font-normal text-slate-50 text-xl">Recent Repos</h1>
          <div className="flex flex-row justify-start">
            {/* List of recently access repos will go here */}
          </div>
        </div>
        {/* Empty containers to ensure each row with the main container aligns correctly */}
        <div className="flex flex-col mx-1 px-4 py-4 w-1/4 h-72"></div>
        <Section
          heading="Boards"
          icon={<BoardIcon />}
          paragraph="Document your project's progression using boards to keep track of bugs and changes."
          buttons={[
            { buttonLabel: 'Open a board', buttonIcon: <BoardIcon />, onMessage: handleOpenBoard },
            { buttonLabel: 'New board', buttonIcon: <NewIcon />, onMessage: handleNewBoard }
          ]}
        />
      </div>
    </div>
  )
}

export default Dashboard
