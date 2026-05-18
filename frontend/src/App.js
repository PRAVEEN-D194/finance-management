
import './App.css';
import CustomerPayment from './pages/CustomerPayment';
import Home from './pages/Home';
import updatecustomer from './components/updatecustomer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/payment/:id' element={<CustomerPayment/>}></Route>
            <Route path='/pdf/:id' element={<CustomerPayment/>}></Route>
            <Route path='/update/:id' element={<updatecustomer/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
