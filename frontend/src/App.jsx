import {Route,Routes} from "react-router-dom"
import Dashboard from './components/dashboard'
import Signin from './components/signin'
import Signup from './components/signup'
import Send from './components/send'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/send" element={<Send/>}/>
    </Routes>
  )
}

export default App
