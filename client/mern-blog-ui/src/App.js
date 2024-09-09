import { Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import PostDetailsPage from './pages/PostDetailsPage';
import { UserContextProvider } from './UserContext';
import Layout from './components/Layout';
import { ThemeProvider } from './Context/ThemeContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route path="/" element={<HomePage />} />

            <Route path={'/login'} element={<LoginPage />} />

            <Route path={'/register'} element={<Register />} />

            <Route path={'/post/:id'} element={<PostDetailsPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/create_post" element={<CreatePost />} />
              <Route path={'/create_post/:id'} element={<CreatePost />} />
            </Route>

          </Route>

        </Routes>
      </UserContextProvider>
    </ThemeProvider>

  );
}

export default App;
