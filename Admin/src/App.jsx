
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Home from './pages/Home'
import AddItems from './pages/AddItems'
import ListItems from './pages/ListItems'
import OrdersAdmin from './pages/OrdersAdmin'
import Auth from './pages/Auth'

function App() {
 

  return (
    <>
    
      <Routes>
      <Route path='/login' element = {<Auth/>}/>
    <Route path='/register' element = {<Auth insideRegister/>}/>
        <Route path='/' element= {<Home/>}/>
        <Route path='/additems' element= {<AddItems/>}/>
        <Route path='/listitems' element= {<ListItems/>}/>
         <Route path='/orderadmin' element= {<OrdersAdmin/>}/>
      </Routes>
    </>
  )
}

export default App
