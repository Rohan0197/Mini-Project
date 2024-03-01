import './App.css';
import { Route, Routes } from 'react-router-dom';
import './hompage.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import SignIn from './components/SignIn';
function App() {
  return (
    <>
      <nav>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign' element={<SignIn />} />
          <Route path='/home' element={Homepage} />
        </Routes>
      </nav>
    </>
  );
}

export default App;
