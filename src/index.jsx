import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { Provider } from 'react-redux';
import { store } from './services/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
