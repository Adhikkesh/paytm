import {Route,Routes} from "react-router-dom"
import Dashboard from './pages/dashboard'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Send from './pages/send'

function App() {

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/send" element={<Send/>}/>
    </Routes>
  )
}

export default App
