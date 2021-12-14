import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import UserLogin from './js/UserLogin';
import ShowTrip from './js/ShowTrip';
import POIForm from './js/POIForm'

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="lotn/" element={<UserLogin/>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
