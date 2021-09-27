import { Switch, Route } from 'react-router-dom';
import Routes from './config/Routes';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes />
    </div>
  )
}

export default App;