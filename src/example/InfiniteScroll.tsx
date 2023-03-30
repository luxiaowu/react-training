import { Loading } from '@alifd/next'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { delay } from '../utils'

const Item = styled.li`
  line-height: 50px;
  font-size: 16px;
  background-color: skyblue;
  margin-bottom: 20px;
  padding-left: 20px;
`

const Last = styled.div`
  text-align: center;
  font-size: 14px;
`

const InfiniteScroll = () => {
  const [list, setList] = useState<number[]>([])
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(30)
  const [maxCurrent, setMaxCurrent] = useState(Math.ceil(total / 10))

  const observer = useRef(
    new IntersectionObserver(entries => {
      const first = entries[0]
      if (first.isIntersecting) {
        setCurrent(no => no + 1)
      }
    })
  )
  const lastElement = useRef(null)

  const fetchList = useCallback(async () => {
    await delay(1000)
    const newList = new Array(10)
      .fill((current - 1) * 10 + 1)
      .map((x, i) => x + i)
    setList(prevList => [...prevList, ...newList])
  }, [current])

  useEffect(() => {
    if (current <= maxCurrent) {
      fetchList()
    }
  }, [current, maxCurrent, fetchList])

  useEffect(() => {
    if (lastElement.current) {
      observer.current.observe(lastElement.current)
    }
    return () => {
      if (lastElement.current) {
        observer.current.unobserve(lastElement.current)
      }
    }
  }, [])

  const reset = () => {
    setMaxCurrent(Math.ceil(total / 10))
    setCurrent(1)
    setList([])
  }

  return (
    <>
      <div style={{ marginBottom: 50 }}>
        <input
          type="number"
          placeholder="限制总数"
          value={total}
          onChange={event => {
            setTotal(+event.target.value)
          }}
        />
        <button onClick={reset} style={{ marginRight: 20 }}>
          应用
        </button>
      </div>
      <ul>
        {list.map(x => (
          <Item key={x}>{x}</Item>
        ))}
        <Last ref={lastElement}>
          {current >= maxCurrent ? '到底了' : <Loading />}
        </Last>
      </ul>
    </>
  )
}

export default InfiniteScroll
