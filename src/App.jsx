import { Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import About from "./pages/publicpages/About"
import Home from "./pages/publicpages/Home"
import Login from "./pages/publicpages/Login"
import Singup from "./pages/publicpages/Singup"
// import Service from "./pages/publicpages/Service";
import Service from "./pages/publicpages/Service"
import Footer from "./components/Footer"
function App() {


  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/service" element={<Service/>}></Route>
      </Routes>
    </>
  );
}

export default App
