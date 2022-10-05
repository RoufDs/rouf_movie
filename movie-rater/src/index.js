import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Auth from './components/Auth';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'


function Router() {

  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Auth} exact />
            <Route path="/movies" component={App} exact />
          </Switch>
        </BrowserRouter>
      </CookiesProvider>
  </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
