
import './App.css';
import CustomerPayment from './pages/CustomerPayment';
import Home from './pages/Home';
import Updatecustomer from './components/Updatecustomer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Updatepayment from './components/Updatepayment';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/payment/:id' element={<CustomerPayment/>}></Route>
            <Route path='/pdf/:id' element={<CustomerPayment/>}></Route>
            <Route path='/update/:id' element={<Updatecustomer/>}></Route>
            <Route path='/updatepayment/:id' element={<Updatepayment/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
