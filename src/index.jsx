import React from 'react'
import ReactDOM from 'react-dom'
import { Home } from './components/home'
import { About } from './components/about'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import './style/main.css'
import './style/nav.css'

const App = () => {

    const [me, setMe] = React.useState({})

    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>

                    <Route path='/' element={<Home />}/>
                    <Route path='/about' element={<About />}/>

                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))