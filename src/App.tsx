import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import RequireAuth from './components/RequireAuth';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Products from './pages/Products/Products';
import Register from './pages/Register/Register';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Route>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
