// import Welcome from '../example/Welcome'
import Calculator from '../example/Calculator'
import Todo from '../example/Todo'
import NoMatch from '../components/NoMatch'
import Dynamic from '../example/Dynamic'
import Diff from '../example/Diff'
import MagicCss from '../example/MagicCss'
import Vortex from '../example/Vortex'
import IntersectionObserver from '../example/InfiniteScroll'
import { HOC } from '../example'

const routes = [
  {
    path: '/',
    redirect: '/diff',
    component: () => null
  },
  {
    path: '/diff',
    component: Diff
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
    path: '/infinite-scroll',
    component: IntersectionObserver
  },
  {
    path: '/magic-css',
    component: MagicCss
  },
  {
    path: '/vortex',
    component: Vortex
  },
  {
    path: '*',
    component: NoMatch
  }
]

export default routes
