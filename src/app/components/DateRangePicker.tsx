import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import DRP, {EventHandler} from 'react-bootstrap-daterangepicker'
import 'bootstrap-daterangepicker/daterangepicker.css'
import InlineSVG from 'react-inlinesvg/esm'
import moment from 'moment'
import daterangepicker from 'daterangepicker'
import {KTSVG} from 'src/_metronic/helpers'

interface DateRangePickerModel {
  startDate?: moment.Moment | null
  endDate?: moment.Moment | null
  initialSettings?: daterangepicker.Options
  onChange: (result: {startDate?: moment.Moment; endDate?: moment.Moment}) => void
  className?: string
  placeholder?: string
  format?: string
  disabled?: boolean
  isClearable?: boolean
  onClear?: () => void
  inputClass?: string
  singleDatePicker?: boolean
  icon?: string
  iconMargin?: number
  text?: string
}

const defaultInitialSetting: daterangepicker.Options = {
  autoApply: false,
  autoUpdateInput: false,
}

const DateRangePicker = ({
  startDate,
  endDate,
  initialSettings = defaultInitialSetting,
  onChange,
  className,
  disabled,
  isClearable,
  onClear,
  inputClass,
  placeholder = 'Pilih range tanggal',
  format = 'DD/MM/YYYY',
  iconMargin = 0,
  icon,
  text,
}: DateRangePickerModel) => {
  const [date, setDate] = useState<{startDate?: moment.Moment; endDate?: moment.Moment}>({})
  const [applied, setApplied] = useState(false)
  const drpRef = useRef<DRP>(null)

  const usedDate = useMemo(() => {
    if (startDate) return {startDate, endDate}
    else if (startDate === null) return undefined
    else if (applied && date.startDate) return date
    return undefined
  }, [startDate, endDate, date, applied])

  const handleApply: EventHandler = useCallback(
    (event, picker) => {
      setDate({
        startDate: picker.startDate,
        endDate: initialSettings.singleDatePicker ? undefined : picker.endDate,
      })
      setApplied(true)
    },
    [initialSettings.singleDatePicker]
  )

  useEffect(() => {
    if (date.startDate) {
      onChange({
        startDate: date.startDate,
        endDate: initialSettings.singleDatePicker ? undefined : date.endDate,
      })
    }
  }, [initialSettings.singleDatePicker, date])

  useEffect(() => {
    if (drpRef && startDate) {
      drpRef.current?.setStartDate(startDate.toDate())
      if (endDate) drpRef.current?.setEndDate(endDate.toDate())
    }
  }, [initialSettings.singleDatePicker, startDate, endDate, drpRef])

  const usedDateFormat = useMemo(() => {
    if (text !== undefined) return text
    if (!usedDate) return ''
    if (usedDate.endDate)
      return `${usedDate.startDate?.format(format)} - ${usedDate.endDate?.format(format)}`
    return usedDate.startDate?.format(format)
  }, [usedDate, text])

  return (
    <div className={`custom-daterange ${className ?? ''}`}>
      <DRP
        initialSettings={{
          ...initialSettings,
          locale: {
            format,
          },
        }}
        ref={drpRef}
        onApply={handleApply}
      >
        <input
          className={`form-control ${inputClass ?? 'form-control-solid'}`}
          placeholder={placeholder}
          disabled={disabled}
          value={usedDateFormat}
          style={{paddingRight: (usedDate ? 56 : 32) + iconMargin}}
          type='text'
          readOnly
        />
      </DRP>
      {Boolean(usedDate) && isClearable && (
        <div
          style={{cursor: 'pointer'}}
          className='svg-close'
          onClick={() => {
            setDate({})
            if (onClear) onClear()
          }}
        >
          <KTSVG className='svg-w-24' path='/media/icons/efood/IconClose.svg' />
        </div>
      )}
      {icon ? (
        <div className='svg-calendar chevron-indicator'>
          <InlineSVG style={{marginRight: iconMargin}} src={icon} />
        </div>
      ) : (
        <InlineSVG
          style={{marginRight: iconMargin}}
          className='svg-calendar'
          src={'/media/icons/efood/IconCalendar.svg'}
        />
      )}
    </div>
  )
}

export default DateRangePicker
