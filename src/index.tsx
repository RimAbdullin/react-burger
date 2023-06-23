import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { Provider } from 'react-redux';
import { store } from './services/store/store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);