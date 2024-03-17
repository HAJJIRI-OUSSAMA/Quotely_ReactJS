
import { Route, Routes } from 'react-router-dom';

import { AdminPage } from './component/admin';
// import { Home } from './component/Home';
import { LandingPage } from './component/landingPage';
import { Home } from './component/home';
import { Login } from './component/login';
import { Update } from './component/edit.comp';



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="home" element={<Home />}></Route>
      <Route path="quote/edit/:id" element={<Update />}></Route>
      <Route path="admin" element={<AdminPage />}></Route>
      <Route path="login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
