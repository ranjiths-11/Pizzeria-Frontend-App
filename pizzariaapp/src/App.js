import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Navbar from './Components/navbar';
import Order from './Components/order';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Cart from './Components/cart';
import Login from './Components/login';
import Register from './Components/register';
import Home from './Components/home';
import Build from './Components/build';
import Summary from './Components/summary';
import Profile from './Components/profile';

function App() {
  return (
    <div>
      
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/build" element={<Build/>} />
          <Route path="/summary" element={<Summary/>} />
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
