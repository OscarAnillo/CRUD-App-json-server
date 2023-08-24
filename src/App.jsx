import { useEffect  } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Home } from './Pages/Home'
import { AddUser } from './Pages/AddUser'
import { EditUser } from './Pages/EditUser'

import { Route, Routes} from 'react-router-dom'
import { getAllUsersPayload } from './Redux/Features/user-slice'

import './App.css'

function App() {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersPayload())
  },[dispatch])

  return (
    <div className='app'>
      <h1>Oscar Anillo</h1>
      <p>Fullstack Developer</p>
      <hr />
      <Routes>
        <Route path="/" element={<Home users={users} /> } />
        <Route path="/adduser" element={<AddUser /> } />
        <Route path="/edituser/:id" element={<EditUser /> } />
      </Routes>
    </div>
  )
}

export default App
