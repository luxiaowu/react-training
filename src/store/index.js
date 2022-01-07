import { createStore } from '@ice/store';
import todos from './todo';

export const { Provider, useModel } = createStore({ todos });
