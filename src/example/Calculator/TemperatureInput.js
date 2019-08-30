import React from 'react'

const ScaleName = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

const TemperatureInput = ({ scale, value, onChange }) => {
  return (
    <fieldset>
      <legend>Enter temperature in {ScaleName[scale]}:</legend>
      <input onChange={onChange} value={value} />
    </fieldset>
  );
}

export default TemperatureInput;
