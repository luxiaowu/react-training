import React, { useState } from 'react'

interface TODO {
  name: string
  done: boolean
}

export default function Todo() {
  const [input, setInput] = useState('')
  const [list, setList] = useState<TODO[]>([])

  // const loadingView = <span>loading...</span>

  return (
    <div>
      <h2>Todos</h2>
      <div>
        <input
          type="text"
          onKeyDown={event => {
            if (event.key === 'Enter' && input) {
              setList([...list, { name: input, done: false }])
              setInput('')
            }
          }}
          onChange={event => setInput(event.target.value)}
          value={input}
          placeholder="Press Enter"
        />
      </div>
      {list.length ? (
        <ul>
          {list.map(({ name, done = false }, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => {
                    setList(
                      list.map(x =>
                        x.name === name ? { ...x, done: !done } : x
                      )
                    )
                  }}
                />
                {done ? <s>{name}</s> : <span>{name}</span>}
              </label>
              <button
                onClick={() => {
                  setList(list.filter(x => x.name !== name))
                }}
              >
                -
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <span>no task</span>
      )}
      {/* {refresh.loading ? loadingView : taskView} */}
    </div>
  )
}
