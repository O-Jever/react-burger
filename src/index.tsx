import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './polyfills';
import './index.css';
import { store } from './services/store';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
