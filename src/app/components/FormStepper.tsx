import clsx from 'clsx'
import React from 'react'
import InlineSVG from 'react-inlinesvg/esm'

export interface FormStepperStep {
  text: string
  step: number
  stepText?: string
  shortName?: string
}

interface Props {
  steps: FormStepperStep[]
  current: number
  onClick?: (step: number) => void
}

const StepperDash: React.FC = () => (
  <div
    style={{
      width: 1,
      flexGrow: 1,
      minHeight: 0,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: 'var(--bs-gray-400)',
    }}
  />
)

const FormStepper: React.FC<Props> = ({steps, current, onClick}) => {
  return (
    <div className='rounded p-6' style={{backgroundColor: '#F5F8FA80'}}>
      {steps.map((step, idx) => (
        <div key={`${step.step}-${idx}`}>
          <div
            className='d-flex align-items-center'
            style={{cursor: onClick ? 'pointer' : 'auto'}}
            onClick={onClick ? () => onClick(step.step) : undefined}
          >
            <div className='d-flex flex-column align-items-center'>
              <div
                className={clsx(
                  'rounded d-flex align-items-center justify-content-center',
                  step.step !== current ? 'bg-light-info text-info' : 'bg-info text-white'
                )}
                style={{width: 40, height: 40, fontWeight: 600}}
              >
                {step.step < current ? (
                  <InlineSVG src={'/media/icons/efood/IconCheck.svg'} />
                ) : (
                  step.stepText ?? step.step
                )}
              </div>
            </div>
            <div
              className={step.step !== current ? 'text-gray-400' : ''}
              style={{fontWeight: 600, marginLeft: 16}}
            >
              {step.text}
            </div>
          </div>
          {idx === steps.length - 1 ? null : (
            <div className='d-flex flex-column align-items-center' style={{width: 40, height: 24}}>
              <StepperDash />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FormStepper
