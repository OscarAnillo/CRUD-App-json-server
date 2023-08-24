import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider} from 'react-redux';
import { store } from './Redux/Store.js';
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
)
