import {Route,Routes} from "react-router-dom"
import Dashboard from './pages/dashboard'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Send from './pages/send'

function App() {

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/" element={<Signup/>}/>
        <Route path="/send" element={<Send/>}/>
      </Route>
    </Routes>
  )
}

export default App
