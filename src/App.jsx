import './App.css'
import Docs from './components/Docs'
import Edit from './components/Edit';
import { Routes, Route } from "react-router-dom";


function App({app,database}) {


  return (
    <>
  
     <Routes>
     <Route path="/" element={<Docs/>}  />
     <Route path="/edit" element={<Edit />} />
   </Routes>
    </>
  )
}

export default App
