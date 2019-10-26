import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import 'tailwindcss/dist/tailwind.min.css'
import './index.css'

const Registration = lazy(() => import('./pages/registration'))
const Admin = lazy(() => import('./pages/admin'))

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Switch>
        <Route path="/" component={Registration} exact />
        <Route path="/admin" component={Admin} exact />
      </Switch>
    </Router>
  </Suspense>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
