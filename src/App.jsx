import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";
import Success from "./pages/Login_success";
import Transition from "./pages/Transition";
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
import Onboarding3 from "./pages/Onboarding3";
import IntroTenseGame from "./pages/Intro_tensegame";
import TenseGameExplanation from "./pages/TenseGameExplanation";
import Stats from "./pages/Stats";
import Listenup from "./pages/Listenup";
import Profile from "./pages/Profile";
import OnboardingProfile from "./pages/OnboardingProfile";
import LanguagePicker from "./pages/LanguagePicker";
import Loader from "./components/Loader";
import ErrorPage from "./pages/ErrorPage";

import Game2 from "./pages/Game2";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding1 />} />
        <Route path="/onboarding2" element={<Onboarding2 />} />
        <Route path="/onboarding3" element={<Onboarding3 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-success" element={<Success />} />
        <Route path="/transition" element={<Transition />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tense-intro" element={<IntroTenseGame />} />
        <Route path="/tense-explanation" element={<TenseGameExplanation />} />

        <Route path="/game2" element={<Game2 />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/listenup" element={<Listenup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/onboarding-profile" element={<OnboardingProfile />} />
        <Route path="/language-picker" element={<LanguagePicker />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;