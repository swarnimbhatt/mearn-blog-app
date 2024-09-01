import './App.css';

import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Post from './Post';
import Layout from './Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Post />} />

        <Route path={'/login'} element={<div>Login page</div>} />

        <Route path={'/register'} element={<div>Register page</div>} />
      </Route>



    </Routes>

  );
}

export default App;
