import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Profilepage from './pages/Profilepage';
import OtherVenueSpecific from './pages/OtherVenueSpecific';
import MyBookingsPage from './pages/MyBookingsPage';
import UserVenues from './pages/UserVenues';
import Searchpage from './pages/Searchpage';
import ErrorPage from './pages/ErrorPage';

function App() {


  return (
    <>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='venue/:id' element={<OtherVenueSpecific />} />
                <Route path='profilepage/:profilename' element={<Profilepage />}/>
                <Route path='mybookings/:profilename' element={<MyBookingsPage />}/>
                <Route path='uservenues/:profilename' element={<UserVenues/>} />
                <Route path='searchpage/:searchValue' element={<Searchpage />} />
                <Route path='*' element={<ErrorPage />} />
            </Route>
        </Routes>
    </>
  )
}

export default App;
