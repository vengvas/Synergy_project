import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {User} from './User';
import {Group} from './Group';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       SynergyWay Test Project
     </h3>

     <Navigation/>

     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/group' component={Group}/>
       <Route path='/user' component={User}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
