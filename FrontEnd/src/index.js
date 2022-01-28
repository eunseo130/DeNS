import React from 'react'
import ReactDOM from 'react-dom'
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Testpage from './component/dashboard/test'
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
// ReactDOM.render(<Testpage />, document.getElementById('root'))
=======
// import { BrowserRouter } from 'react-router-dom'
// import App from './App'

// ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))

import Login from './component/loginComponent/Login'
ReactDOM.render(<Login/>, document.getElementById('root'));
// import Dashboard from './component/dashboardComponent/Dashboard'
// ReactDOM.render(<Dashboard/>, document.getElementById('root'));
>>>>>>> 6b5ef2687990ae68e923ea43d76c20d6878c9b95
