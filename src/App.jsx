import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Profilepage from './pages/Profilepage';
import OtherVenueSpecific from './pages/OtherVenueSpecific';
import MyBookingsPage from './pages/MyBookingsPage';

function App() {


  return (
    <>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='venue/:id' element={<OtherVenueSpecific />} />
                <Route path='profilepage/:profilename' element={<Profilepage />}/>
                <Route path='mybookings/:profilename' element={<MyBookingsPage />}/>
            </Route>
        </Routes>
    </>
  )
}

export default App;
