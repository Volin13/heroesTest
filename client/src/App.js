import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './redux/store';

import HeaderBar from './components/bars/HeaderBar';
import FooterBar from './components/bars/FooterBar';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <HeaderBar />
            <ToastContainer
              style={{ marginTop: '60px' }}
              position="top-right"
              newestOnTop={false}
              autoClose={5000}
              closeOnClick
              theme="dark"
            />
            <div className="mainBackground" style={{ flex: 1 }}>
              <AppRouter />
            </div>
            <FooterBar />
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
