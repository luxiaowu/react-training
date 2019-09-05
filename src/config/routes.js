import Welcome from '../example/Welcome';
import Calculator from '../example/Calculator'
import Todo from '../example/Todo'
import NoMatch from '../components/NoMatch';
import Dynamic from "../example/Dynamic";
import { HOC } from "../example";

const routes = [
  {
    path: '/',
    component: Welcome,
    exact: true
  },
  {
    path: '/lifting-state-up',
    component: Calculator
  },
  {
    path: '/todo',
    component: Todo
  },
  {
    path: '/dynamic',
    component: Dynamic
  },
  {
    path: '/higher-order-components',
    component: HOC
  },
  {
    component: NoMatch
  }
]

export default routes
