import {toAbsoluteUrl} from '../../../helpers'

export function FallbackView() {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center w-100 h-100'>
      <img
        className='mb-4'
        src={toAbsoluteUrl('/media/icons/efood/IconEfood.png')}
        alt='Start logo'
        style={{width: 80, height: 80}}
      />
      <span className='ms-4'>Loading ...</span>
    </div>
  )
}
