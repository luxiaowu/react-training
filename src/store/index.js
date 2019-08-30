import IceStore from '@ice/store'
import todos from './todo'

const icestore = new IceStore()
icestore.registerStore('todos', todos)

export default icestore