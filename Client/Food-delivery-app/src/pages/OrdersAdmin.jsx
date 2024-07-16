import React from 'react'
import { Form } from 'react-bootstrap'


function OrdersAdmin() {
  return (
    <>
<div>
    <h3>Orders Page</h3>
    <div className='container p-5'>
 
 <table className='table'>
 <thead>
      
     </thead>
     <tbody>
      <tr>
        <td><img height={'70px'} src="https://img.freepik.com/free-psd/isolated-cardboard-box_125540-1169.jpg" alt="" /></td>
        <td>Peri Peri Rolls * 3 
           <div className='mt-3'>
               <h6> Max Miller</h6>
             <p>   GreenPark,WhiteField </p>
               <p> Bangalore,Karnadaka,500000,560000 </p>
                 <p>999999999</p>
    
           </div>

        </td>
        <td>$12</td>
        <td>Items.2</td>
       <td>
       <Form.Select   aria-label="Floating label select example">
            
            <option value="Biology">Food Processing</option>
            <option value="Computer Science">Out of Delivery </option>
            <option value="Commerse">Delivered</option>
          </Form.Select>
       </td>
      
      </tr>
     </tbody>
 </table>
</div>

</div>

    </>
  )
}

export default OrdersAdmin