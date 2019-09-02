import IceStore from '@ice/store'
import logger from '@ice/store-logger';
import todos from './todo'

const icestore = new IceStore()
const middlewares = []

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

icestore.applyMiddleware(middlewares)
icestore.registerStore('todos', todos)

export default icestore