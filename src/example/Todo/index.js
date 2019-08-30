import React, { useEffect } from 'react'
import stores from '../../store'

export default function Todo() {
  const todos = stores.useStore('todos')
  const { dataSource, add, remove, toggle, refresh } = todos;

  useEffect(() => {
    refresh()
  }, []);

  return (
    <div>
      <h2>Todos</h2>
      <div>
        <input type="text" onKeyDown={event => {
          if (event.keyCode === 13) {
            // setDataSource([{name: event.target.value, done: false}].concat(dataSource))
            add({ name: event.target.value, done: false })
            event.target.value = ''
          }
        }} />
      </div>
      <ul>
        {dataSource.map(({ name, done }, i) => <li key={i}>
          <input type="checkbox" onChange={e => {
            // const _dataSource = dataSource.map(x => x)
            // _dataSource[i].done = e.target.checked
            // console.log (e.target. checked, dataSource, _dataSource)
            // setDataSource(_dataSource)
            toggle(i)
          }} />
          {done ? <s>{name}</s> : <span>{name}</span>}
          {/* <button onClick={() => setDataSource(dataSource.slice(0, i).concat(dataSource.slice(i + 1, dataSource.length)))}>-</button> */}
          <button onClick={() => remove(i)}>-</button>
        </li >)}
      </ul>
    </div>
  )
}

