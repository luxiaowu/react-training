import React, { Component } from 'react'
import TemeratureInput from './TemperatureInput'
import BoilingVerdict from './BoilingVerdict'

const toCelsius = fahrenheit => (fahrenheit - 32) * 5 / 9
export const toFahrenheit = celsius => (celsius * 9 / 5) + 32
export const tryConvert = (temperature, convert) => {
  const input = parseFloat(temperature)
  if (Number.isNaN(input)) return ''
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}

export default class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: '',
      scale: ''
    }
  }

  handleChange = scale => event => {
    const temperature = event.target.value
    this.setState({ temperature, scale });
  }

  render() {
    const { temperature, scale } = this.state
    const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
    const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit)
    return (
      <>
        <TemeratureInput scale="c" value={celsius} onChange={this.handleChange('c')} />
        <TemeratureInput scale="f" value={fahrenheit} onChange={this.handleChange('f')} />
        <BoilingVerdict celsius={celsius} />
      </>
    )
  }
}
