import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

function AddItems() {
  return (
    <>
<div className='container w-75 p-5'>
    <div className='mb-3'>
    <h5>Upload Image</h5>
   
        <label> 
                <input type="file" style={{display:'none'}} />
                <img style={{height:'100px'}} className='img-fluid' src='https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg' alt="" />
                </label>
   </div>
           <div  className='mb-3'>
                <h5>Product Name</h5>
                <FloatingLabel controlId="floatingname" label="Type Here">
            <Form.Control type="text" placeholder="Type Here" />
          </FloatingLabel>
           </div>
     <div  className='mb-3'>
          <h5>Product Description</h5>
          <FloatingLabel controlId="floatingTextarea2" label="Write Content Here">
            <Form.Control
              as="textarea"
              placeholder="Write Content Here"
              style={{ height: '200px' }}
            />
          </FloatingLabel>
     </div>
      <div className='d-flex justify-content-between '>
        <h5>Product category</h5>
        <h5>Product Price</h5>
      </div>
      
    <div className='d-flex justify-content-between mb-3 '>
    
    {/* <Form.Label> Product category</Form.Label> */}
      <FloatingLabel
          controlId="floatingSelectGrid"
          
        >
          <Form.Select  aria-label="Floating label select example">
           
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          
          
          
          
          
          </Form.Select>
        </FloatingLabel>
          {/* <h5>Product Price</h5> */}
          <FloatingLabel controlId="floatingname" label="$25">
        <Form.Control type="text" placeholder="$25" />
      </FloatingLabel>
    </div>
    <div>
        <button className='btn btn-primary'>Add</button>
    </div>
</div>
    </>
  )
}

export default AddItems