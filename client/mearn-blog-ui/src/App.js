import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './Header';
import Post from './Post';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<HomePage />} />

        <Route path={'/login'} element={<LoginPage />} />

        <Route path={'/register'} element={<Register />} />
      </Route>

    </Routes>

  );
}

export default App;
