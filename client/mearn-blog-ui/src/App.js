import { Routes, Route } from 'react-router-dom';

import './App.css';

import Layout from './Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import PostDetailsPage from './pages/PostDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<HomePage />} />

        <Route path={'/login'} element={<LoginPage />} />

        <Route path={'/register'} element={<Register />} />

        <Route path={'/create_post'} element={<CreatePost />} />

        <Route path={'/post/:id'} element={<PostDetailsPage />} />

        <Route path={'/create_post/:id'} element={<CreatePost />} />

      </Route>

    </Routes>

  );
}

export default App;
