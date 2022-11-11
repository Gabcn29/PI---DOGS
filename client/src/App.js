import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './Componentes/Home/LandingPage';
import DogsHome from './Componentes/Home/Home';
import DogCreate from './Componentes/CreateDog/CreateDog';

import DogDetail from './Componentes/DogDetail/DogDetail';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path= '/' component={LandingPage}/>
          <Route exact path= '/home' component={DogsHome}/>
          <Route exact path= '/createDog' component={DogCreate}/>
          <Route exact path= '/home/:id' component={DogDetail}/>
        </Switch>        
      </div>
    </BrowserRouter>
  );
}

export default App;
