import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
  color: #333;
  line-height: 2;
`

const Content = styled.span`
  background: linear-gradient(to right, #000, #000) no-repeat right bottom;
  /* background: linear-gradient(to right, #ec695c, #61c454) no-repeat right bottom; */
  background-size: 0 2px;
  transition: background-size 1300ms;
  &:hover {
    background-size: 100% 2px;
    background-position-x: left;
  }
`

const MagicCss = () => {
  return (
    <>
      <Title>
        <Content>十年后，你会发现CSS才是你永远也学不会的语言</Content>
      </Title>
      <div>鼠标 hover 上去试试</div>
    </>
  )
}

export default MagicCss
