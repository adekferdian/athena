import React, {useState,useEffect} from 'react'
import InlineSVG from 'react-inlinesvg/esm'

interface TRPModel {
  onChange: Function
  defaultValue?: TRPValueModel | any
  setApplied?: boolean
  blurFunc?: any | Function
}

export interface TRPStateModel {
  startHour: string
  startMinute: string
  endHour: string
  endMinute: string
}

export interface TRPValueModel {
  startTime: string
  endTime: string
}

export const TimeRangePicker = ({blurFunc,onChange, defaultValue, setApplied}: TRPModel) => {
  const [data, setData] = useState<any>({
    startHour: '00',
    startMinute: '00',
    endHour: '00',
    endMinute: '00',
  })
  const [defaultApplied, setDefaultApplied] = useState(false)

  const zeroPrefixer = (value: number) => {
    if (value < 10) return `0${value}`
    return value
  }

  const handleChange = (target: any) => {
    const {name, value} = target
    const test = name.includes('Hour') ? Number(value) <= 24 : Number(value) <= 59
    if (test) {
      setData((old: any) => ({...old, [name]: value}))
    }
  }

  const handleBlur = (target: any) => {
    const {name, value} = target
    const hour = name.includes('Minute')
      ? name.includes('start')
        ? 'startHour'
        : 'endHour'
      : undefined
    if (hour && Number(data[hour]) === 24) {
      setData((old: any) => ({...old, [hour]: '00', [name]: value}))
    }
    if (Number(value) < 10 && value.length < 2) {
      setData((old: any) => ({...old, [name]: `0${value}`}))
    }
  }

  const handleKeyPress = (event: any) => {
    const {target, key} = event
    if (!/[0-9]/.test(key)) {
      event.preventDefault()
    } else {
      if (Number(data[target.name]) < 1) {
        setData((old: any) => ({...old, [target.name]: ''}))
      }
    }
  }

  const blurCap = () => {
    blurFunc({startTime: `${data.startHour}:${data.startMinute}`,
    endTime: `${data.endHour}:${data.endMinute}`}as TRPValueModel)
  }

  const handleKeyDown = (event: any) => {
    const {keyCode, target} = event
    if (keyCode === 38) {
      if (target.name === 'startHour' || target.name === 'endHour') {
        if (Number(data[target.name]) < 24)
          setData((old: any) => ({
            ...old,
            [target.name]: zeroPrefixer(Number(data[target.name]) + 1),
          }))
      } else {
        const hour = target.name.includes('start') ? 'startHour' : 'endHour'
        if (Number(data[target.name]) < 59) {
          if (Number(data[hour]) === 24) {
            setData((old: any) => ({
              ...old,
              [hour]: '00',
              [target.name]: zeroPrefixer(Number(data[target.name]) + 1),
            }))
          } else {
            setData((old: any) => ({
              ...old,
              [target.name]: zeroPrefixer(Number(data[target.name]) + 1),
            }))
          }
        } else {
          if (Number(data[hour]) < 24) {
            setData((old: any) => ({
              ...old,
              [hour]: zeroPrefixer(Number(data[hour]) + 1),
              [target.name]: '00',
            }))
          } else {
            setData((old: any) => ({
              ...old,
              [hour]: '00',
              [target.name]: '00',
            }))
          }
        }
      }
    } else if (keyCode === 40) {
      if (target.name === 'startHour' || target.name === 'endHour') {
        if (Number(data[target.name]) > 1)
          setData((old: any) => ({
            ...old,
            [target.name]: zeroPrefixer(Number(data[target.name]) - 1),
          }))
      } else {
        const hour = target.name.includes('start') ? 'startHour' : 'endHour'
        if (Number(data[target.name]) > 0) {
          setData((old: any) => ({
            ...old,
            [target.name]: zeroPrefixer(Number(data[target.name]) - 1),
          }))
        } else {
          setData((old: any) => ({
            ...old,
            [hour]: Number(data[hour]) > 1 ? zeroPrefixer(Number(data[hour]) - 1) : '23',
            [target.name]: '59',
          }))
        }
      }
    }
  }

  useEffect(() => {
    onChange({
      startTime: `${data.startHour}:${data.startMinute}`,
      endTime: `${data.endHour}:${data.endMinute}`,
    } as TRPValueModel)
  }, [data])

  useEffect(() => {
    if (defaultValue && !defaultApplied) {
      setData({
        startHour: defaultValue.startTime ? defaultValue.startTime.split(':')[0] : '00',
        startMinute: defaultValue.startTime ? defaultValue.startTime.split(':')[1] : '00',
        endHour: defaultValue.endTime ? defaultValue.endTime.split(':')[0] : '00',
        endMinute: defaultValue.endTime ? defaultValue.endTime.split(':')[1] : '00',
      })
      setDefaultApplied(true)
    } else if (defaultValue && setApplied) {
      setData({
        startHour: defaultValue.startTime ? defaultValue.startTime.split(':')[0] : '00',
        startMinute: defaultValue.startTime ? defaultValue.startTime.split(':')[1] : '00',
        endHour: defaultValue.endTime ? defaultValue.endTime.split(':')[0] : '00',
        endMinute: defaultValue.endTime ? defaultValue.endTime.split(':')[1] : '00',
      })
    }
  }, [defaultValue])

  return (
    <div className='custom-timerange' onBlurCapture={blurCap} >
      <div>
        <input
          type='tel'
          maxLength={2}
          name='startHour'
          value={data.startHour}
          onChange={({target}) => handleChange(target)}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          onBlur={({target}) => handleBlur(target)}
          className='custom-timerange__hour'
        />
        <span className='custom-timerange__colon'>:</span>

        <input
          type='tel'
          maxLength={2}
          name='startMinute'
          value={data.startMinute}
          onChange={({target}) => handleChange(target)}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          onBlur={({target}) => handleBlur(target)}
          className='custom-timerange__minute'
        />
      </div>
      <span className='custom-timerange__separator'>-</span>
      <div>
        <input
          type='tel'
          maxLength={2}
          name='endHour'
          value={data.endHour}
          onChange={({target}) => handleChange(target)}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          onBlur={({target}) => handleBlur(target)}
          className='custom-timerange__hour'
        />
        <span className='custom-timerange__colon'>:</span>
        <input
          type='tel'
          maxLength={2}
          name='endMinute'
          value={data.endMinute}
          onChange={({target}) => handleChange(target)}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          onBlur={({target}) => handleBlur(target)}
          className='custom-timerange__minute'
        />
      </div>
      <InlineSVG src='/media/icons/efood/IconClock.svg' />
    </div>
  )
}

export default TimeRangePicker
