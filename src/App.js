import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import { Outlet } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <div>
        <h1>I am a navigator</h1>
      </div>
      <Outlet />
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index  element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
