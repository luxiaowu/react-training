import React from 'react'
import { useLocation } from 'react-router-dom'

const NoMatch = () => {
  const location = useLocation()
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
      <h4>敬请期待！</h4>
    </div>
  )
}

export default NoMatch
