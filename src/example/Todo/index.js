import React, { useEffect } from 'react';
import { useModel } from '../../store';

export default function Todo() {
  // const { dataSource, add, remove, toggle, refresh } = useModel('todos');
  const [dataSource, dispatchers] = useModel('todos');
  const { add, remove, toggle, refresh } = dispatchers;

  useEffect(() => {
    if (!dataSource.length) refresh();
  }, []);

  const noTaskView = <span>no task</span>;
  const loadingView = <span>loading...</span>;
  const taskView = dataSource.length ? (
    <ul>
      {dataSource.map(({ name, done = false }, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              checked={done}
              onChange={() => toggle(index)}
            />
            {done ? <s>{name}</s> : <span>{name}</span>}
          </label>
          <button onClick={() => remove(index)}>-</button>
        </li>
      ))}
    </ul>
  ) : (
    noTaskView
  );

  return (
    <div>
      <h2>Todos</h2>
      <div>
        <input
          type="text"
          onKeyDown={(event) => {
            if (event.keyCode === 13 && event.target.value) {
              add({ name: event.target.value, done: false });
              event.target.value = '';
            }
          }}
          placeholder="Press Enter"
        />
      </div>
      {refresh.loading ? loadingView : taskView}
    </div>
  );
}
