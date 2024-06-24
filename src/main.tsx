import ReactDOM from 'react-dom/client';
import './app/index.scss';
import { Provider } from 'react-redux';
import App from './app/App';
import { store } from './app/store/root';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
