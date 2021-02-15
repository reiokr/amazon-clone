import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Error from './pages/Error'
import Loading from './components/loading'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import { useGlobal } from './context'

function App() {
  const { ...state } = useGlobal()

  return (
    //BEM
    <div className='App'>
      <Router>
        {state.loading && <Loading />}
        <Route path='/login'>
          <Login />
        </Route>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/cart'>
            <Cart />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
