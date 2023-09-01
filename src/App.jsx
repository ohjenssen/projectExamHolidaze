import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

function App() {


  return (
    <>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<div>Home</div>} />
            </Route>
        </Routes>
    </>
  )
}

export default App;
