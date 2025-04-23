import { Routes, Route } from 'react-router-dom'
import HotelQuestionnaire from './components/HotelQuestionnaire'
import Home from './Pages/Home';

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/hotel-questionnaire" element={<HotelQuestionnaire />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
