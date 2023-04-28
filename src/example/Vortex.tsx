import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Checkbox, Icon } from '@alifd/next'
import vortex from '../store/vortex'
import { useAppSelector, useAppDispatch } from '../hooks'

const Row = styled.div`
  display: flex;
  &:last-child div {
    border-bottom: 1px solid #000;
  }
`

const Col = styled.div<{ last?: boolean }>`
  width: 80px;
  height: 80px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: skyblue;
  border-left: 1px solid #000;
  border-top: 1px solid #000;
  &:last-child {
    border-right: 1px solid #000;
  }
  color: ${props => (props.last ? 'red' : '#000')};
`

const Input = styled.input`
  font-size: 16px;
  margin-right: 20px;
`

interface Item {
  value: number
  direction: 'left' | 'right' | 'up' | 'down'
  last?: boolean
}

const generateVortexArray = (n: number, m: number): Item[][] => {
  const table = new Array(n).fill(0).map(() => new Array(m).fill(0))

  const vortex = () => {
    let x = 0
    let y = 0
    let stepX = 1
    let stepY = 0
    let count = 1

    const hasBlock = (currentX: number, currentY: number) =>
      !table[currentY] || table[currentY][currentX] !== 0

    const getDirection = () =>
      stepX > 0 ? 'right' : stepY > 0 ? 'down' : stepX < 0 ? 'left' : 'up'

    while (1) {
      table[y][x] = {
        value: count++,
        direction: getDirection()
      }
      x += stepX
      y += stepY
      if (hasBlock(x, y)) {
        count--
        if (stepY === 0) {
          x = x - stepX
          stepY = stepX
          stepX = 0
        } else {
          y = y - stepY
          stepX = -stepY
          stepY = 0
        }

        if (hasBlock(x + stepX, y + stepY)) {
          table[y][x].last = true
          break
        }
      }
    }
  }

  vortex()

  return table
}

const Vortex = () => {
  const { row, col } = useAppSelector(state => state.vortex.value)
  const directionVisible = useAppSelector(
    state => state.vortex.directionVisible
  )

  const setValue = vortex.actions.setValue
  const setDirectionVisible = vortex.actions.setDirectionVisible
  const dispatch = useAppDispatch()

  const [dataSource, setDataSource] = useState<Item[][]>([])

  useEffect(() => {
    if (row && col) {
      const nextDataSource = generateVortexArray(+row, +col)
      setDataSource(nextDataSource)
    }
  }, [row, col])

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Input
          placeholder="请输入行数"
          type="number"
          value={row}
          onChange={event => dispatch(setValue({ row: event.target.value }))}
        />
        <Input
          placeholder="请输入列数"
          type="number"
          value={col}
          onChange={event => dispatch(setValue({ col: event.target.value }))}
        />
        <Checkbox
          checked={directionVisible}
          onChange={checked => dispatch(setDirectionVisible(checked))}
        >
          显示方向
        </Checkbox>
      </div>
      {dataSource.map((row, i) => (
        <Row key={i}>
          {row.map((col, j) => (
            <Col key={j} last={col.last}>
              <span>{col.value}</span>
              {directionVisible && (
                <Icon size="xxs" type={`arrow-${col.direction}`} color="red" />
              )}
            </Col>
          ))}
        </Row>
      ))}
    </div>
  )
}

export default Vortex
