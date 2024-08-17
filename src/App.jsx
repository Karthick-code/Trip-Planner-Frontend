import Layout from './components/Layout'
import {Route,BrowserRouter, Routes} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import {AuthProvider} from './context/AuthContext'
import User from './components/user/User'
import Updateuser from './components/user/Updateuser'
import Addtravel from './components/travelplan/Addtravel'
import Travelplan from './components/travelplan/Travelplan'
import Todo from './components/todo/Todo'
import Addtodo from './components/todo/Addtodo'
import Edittodo from './components/todo/Edittodo'
import Adddestination from './components/AddDestination'
import Travelbook from './components/travelbooking/Travelbook'
import Accomodation from './components/travelbooking/accomodation/Accomodation'
import Expenselimit from './components/user/Expenselimit'
import Flight from './components/travelbooking/transport/flight/Flight'
import Train from './components/travelbooking/transport/train/Train'
import Bus from './components/travelbooking/transport/bus/Bus'
import Footer from './components/Footer'

function App() {

  return (
    <div className="App">
    <AuthProvider>
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>{/*wecan use also for destinations*/}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/user" element={<User />}></Route> 
            <Route path="/update-user" element={<Updateuser />}></Route>
            <Route path="/travelplan" element={<Travelplan />}></Route>
            <Route path="/addtravel" element={<Addtravel />}></Route>
            <Route path="/todo" element={<Todo/>}></Route>
            <Route path="/addtodo" element={<Addtodo/>}></Route>
            <Route path="/edittodo/:id" element={<Edittodo/>}></Route>
            <Route path="/adddestination" element={<Adddestination />}></Route>
            <Route path="/travelbooking" element={<Travelbook />}></Route>
            <Route path="/accomodation" element={<Accomodation />}></Route>
            <Route path="/expenselimit" element={<Expenselimit />}></Route>
            <Route path="/travel/flight" element={<Flight />}></Route>
            <Route path="/travel/train" element={<Train />}></Route>
            <Route path="/travel/bus" element={<Bus />}></Route>
          </Routes>
        </Layout>
    </BrowserRouter>
    </AuthProvider>
    {/* <Footer/> */}
    </div>
    
  )
}

export default App
