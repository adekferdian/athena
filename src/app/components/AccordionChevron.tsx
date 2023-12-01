import React from 'react'
import {AccordionContext} from 'react-bootstrap-v5'
import InlineSVG from 'react-inlinesvg/esm'

const AccordionChevron: React.FC<{eventKey: string}> = ({eventKey}) => {
  const currentEventKey = React.useContext(AccordionContext)

  const isCurrentEventKey = currentEventKey === eventKey

  return (
    <InlineSVG
      src='/media/icons/efood/IconChevronDown.svg'
      style={{
        transition: 'transform .3s ease-in-out',
        transform: isCurrentEventKey ? 'rotate(180deg)' : '',
      }}
      className='me-3'
    />
  )
}

export default AccordionChevron
