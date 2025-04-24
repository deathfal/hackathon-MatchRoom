import { Routes, Route } from 'react-router-dom'
import Questionnaire from './Pages/Questionnaire'
import Home from './Pages/Home'
import Maps from './Pages/Maps';
import Favorites from './Pages/Favorites';
// import Login from './Pages/Login';
import Preferences from './Pages/Preferences';
import Profil from './Pages/Profil';
import Rewards from './Pages/Rewards';
import SignupCustomer from './Pages/SignupCustomer';
import SignupHotel from './Pages/SignupHotel';
import SignupType from './Pages/SignupType';
import SignupComplete from './Pages/SignupComplete';
import Search  from './Pages/search';

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/search" element={<Search />} />
        <Route path="/preferences" element={<Preferences />} />
        {/*
        <Route path="/login" element={<Login />} />
        
        
        */}
        <Route path="/signup-customer" element={<SignupCustomer />} />
        <Route path="/signup-hotel" element={<SignupHotel />} />
        <Route path="/signup-type" element={<SignupType />} />
        <Route path="/signup-complete" element={<SignupComplete />} />
      </Routes>
    </div>
  )
}

export default App
