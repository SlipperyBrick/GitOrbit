import './Section.css'

import Button from '@components/Buttons/Button'

interface SectionProps {
  heading: string
  icon: React.ReactElement
  paragraph: string
  buttons?: {
    buttonLabel: string
    buttonIcon: React.ReactElement
    onMessage: () => void
  }[]
}

const Section: React.FunctionComponent<SectionProps> = ({
  heading,
  icon,
  paragraph,
  buttons
}: SectionProps) => {
  return (
    <div className="flex flex-col mx-1 px-4 w-1/4 h-72">
      {/* Section heading */}
      <div className="flex flex-row justify-start items-center">
        <div className="flex flex-row justify-center items-center w-6 h-6 mr-6">{icon}</div>
        <h1 className="font-poppins font-semibold text-white text-xl">{heading}</h1>
      </div>
      <div className="my-4 h-1 rounded gradient-line" />
      <div className="h-16">
        <p className="font-poppins font-normal text-white text-sm">{paragraph}</p>
      </div>
      <div className="flex flex-col flex-1 justify-start items-start">
        {buttons?.map((_label, index) => (
          <Button
            buttonStyle="my-1 w-4/6 h-12 bg-[#272A31] font-poppins font-normal text-white text-sm rounded drop-shadow-sm hover:bg-[#2D3139] active:bg-[#383B41] transition duration-100 ease-in-out"
            icon={buttons[index].buttonIcon}
            iconStyle={{ iconColour: 'white', css: 'w-5 h-5' }}
            onMessage={buttons[index].onMessage}
            key={buttons[index].buttonLabel}
          >
            {buttons[index].buttonLabel}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Section
