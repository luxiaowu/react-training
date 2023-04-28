import React from 'react'
import { useRef, useState } from 'react'
import { Input } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'

interface IProps {
  value: string | undefined
  onChange: (value: string) => void
  size: SizeType
}

const InputIME: React.FC<IProps> = ({ value, onChange, size }) => {
  const [innerValue, setInnerValue] = useState(value)

  const lockRef = useRef(false)

  const onCompositionStart = () => {
    // console.log("onCompositionStart")
    lockRef.current = true
  }

  const onCompositionEnd: React.CompositionEventHandler<
    HTMLInputElement
  > = e => {
    // console.log("onCompositionEnd", e)
    lockRef.current = false
    // onChange(e.target.value)
  }

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    // console.log("onInputChange", e.target.value, lockRef)
    setInnerValue(e.target.value)
    if (!lockRef.current) {
      onChange(e.target.value)
    }
  }

  return (
    <Input
      size={size}
      value={innerValue}
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
      //   onCompositionUpdate={onCompositionUpdate}
      onChange={onInputChange}
    />
  )
}

export default InputIME
