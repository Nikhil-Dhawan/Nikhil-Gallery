// import logo from './logo.svg';
import "./App.css";
import Alldata from "./component/dataAll";
import Getdetail from "./component/getdetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Alldata/>}/>
        <Route path="single/:id" element={<Getdetail />} />
        
        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
