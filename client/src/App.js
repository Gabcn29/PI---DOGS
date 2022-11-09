import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './Componentes/Home/LandingPage';
import DogsHome from './Componentes/Home/Home';
import dogCreate from './Componentes/CreateDog/CreateDog';
import Nav from './Componentes/Home/Nav';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path= '/' component={LandingPage}/>
          <Route exact path= '/home' component={DogsHome}/>
          <Route exact path= '/createDog' component={dogCreate}/>
          <Route path={'/'} component={Nav}/>
        </Switch>        
      </div>
    </BrowserRouter>
  );
}

export default App;
