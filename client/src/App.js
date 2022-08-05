//Para navegar me tengo que traer el componente Route para decir donde quiero
//mostrar cada cosa
import {Route} from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import Details from './components/Details/Detail';
import DogsCreate from './components/DogsCreate/DogsCreate';
import Home from './components/Home/Home';


function App() {
  return (
    <div className="App">
      <NavBar/> 
      <Route path='/' exact component={LandingPage}/>
      <Route path='/dogs' exact component={Home}/>
      <Route path='/dogs/:id' component={Details}/>
      <Route path='/create/dogs' component={DogsCreate}/>
    </div>
  );
}

export default App;

