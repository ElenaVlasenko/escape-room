import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { Provider } from 'react-redux';
import { fetchQuestsAction } from './store/quests-slice/quests-slice';
import store from './store/store';
import { checkAuthAction } from './store/user-slice/user-slice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchQuestsAction());
store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
