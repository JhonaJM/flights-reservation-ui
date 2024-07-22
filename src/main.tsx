import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux'
import { store } from './store'
import SearchFlights from './components/reservation/SearchFlights.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const rootElement = document.getElementById('root');
if (rootElement) {
  
  ReactDOM.createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
      <BrowserRouter>
        <Routes>              
                <Route path="*" element={<DefaultLayout />} />
        </Routes>
      </BrowserRouter>
      
    </Provider>,
  )
}

