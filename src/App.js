import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import NavBar from './components/AppBar/AppBar'
import Login from './pages/Login'
import {useEffect, useState} from 'react'
function App() {
  const idToken = !!localStorage.getItem('token');
  const [login,setLogin]= useState(idToken);
  const [data,setData] = useState({});
  const [email,setEmail] = useState('');
  useEffect(()=>{
    const em = localStorage.getItem('email');
    if(!!em){
      setEmail(em);
    }
  })
  return (
    <Router>
      <Switch>
        <NavBar email={email} setIslogin={setLogin} isLogin={login}>
        <Route exact path="/">
          <Notes data = {data} email={email} isLogin={login} />
        </Route>
        {login &&<Route path="/create">
          <Create email = {email} />
        </Route>}
        <Route path='/login'>
          <Login setdata={setData}  isLogin={setLogin}/>
        </Route>
        </NavBar>
      </Switch>
    </Router>
  );
}

export default App;
