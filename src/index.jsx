import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './components/HomePage';

import "./style/main.css";



class Main extends Component {

  render() {
    return (
      <React.StrictMode>
          <h1>Punchline Panel</h1>
          <Routes>
            {/* ROUTE HOME */}
              <Route exact path="/" element={<HomePage/>}/>
          </Routes>
      </React.StrictMode>
    )
  }
}
  
const app = document.getElementById("root");
ReactDOM.render(<BrowserRouter><Main/></BrowserRouter>, app)