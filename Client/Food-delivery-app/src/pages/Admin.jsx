import React, { useState } from 'react';
import AddItems from './AddItems';
import ListItems from './ListItems';
import OrdersAdmin from './OrdersAdmin';

function Admin() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className='container'>
        <h2 style={{ fontFamily: " 'Lobster', sans-seri" ,fontSize:'30px'}}> Fast Food <i className="fa-solid fa-burger"></i></h2>
        <h6>Admin Panel</h6>
        <hr />
        <div className="row ">
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
        
            <div className="col-lg-10" style={{ borderLeft: '2px solid black', height:'100vh' }}>
              {activeComponent === 'AddItems' && <AddItems />}
              {activeComponent === 'ListItems' && <ListItems />}
              {activeComponent === 'OrdersAdmin' && <OrdersAdmin />}
            </div>
        </div>
    </div>
  )
}

export default Admin;
