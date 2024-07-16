import React, { useState } from 'react'
import AddItems from './AddItems';
import ListItems from './ListItems';
import OrdersAdmin from './OrdersAdmin';
import Header from '../Components/Header';
useState
function Home() {

  const [activeComponent, setActiveComponent] = useState(null);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div style={{
        width:'100%',height:'100vh',
        backgroundImage: 'url("https://wallpapercave.com/wp/wp9919653.jpg")',
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    position: 'relative', // Add position relative
                overflowY: 'auto',
    }} >
       
        <div className='container text-white  ' style={{backgroundColor: 'rgba(0, 0, 0, 0.7)',paddingBottom: '20px',overflow: 'auto' }}>
            <Header/>
            <div className="row d-flex flex-wrap ">
                <div className="col-lg-2 text-end ">
                   <div className='row ms-4'>
                        <button className='btn btn-primary mt-3 text-end' onClick={() => handleComponentChange('AddItems')}>
                            <i className="fa-solid fa-circle-plus"></i> Add Items
                        </button>
                        <button className='btn btn-primary mt-3 text-end' onClick={() => handleComponentChange('ListItems')}>
                            <i className="fa-solid fa-bars"></i> List Items
                        </button>   
                        <button className='btn btn-primary mt-3 text-end' onClick={() => handleComponentChange('OrdersAdmin')}>
                            <i className="fa-solid fa-bars"></i> Orders
                        </button> 
                    </div>    
                </div>
            
                <div className="col-lg-10" style={{ borderLeft: '2px solid white', height:'100vh',overflow:'auto' }}>
                  {activeComponent === 'AddItems' && <AddItems />}
                  {activeComponent === 'ListItems' && <ListItems />}
                  {activeComponent === 'OrdersAdmin' && <OrdersAdmin />}
                </div>
            </div>
        </div>
    </div>
  )

}

export default Home