import React, { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { assets } from '../assets/assets'
import { StoreContext } from '../context/StoreContext'
import { SERVER_URL } from '../Services/serverURL'

function Cards({id,name,price,description,image}) {
 const {cartItems,addToCart,removeFromCart} = useContext(StoreContext)
 
  return (
    <>


 

   <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
      <Card style={{ width: '16rem' ,border:'none'}}>
            <Card.Img style={{borderTopLeftRadius: '20px', 
          borderTopRightRadius: '20px',
          borderBottomLeftRadius: '0px', 
          borderBottomRightRadius: '0px',positionr:'relative'}} height={'250px'} variant="top" src={`${SERVER_URL}/uploads/${image}`} />
          
          {
            !cartItems[id]?
            <img style={{position:'absolute', bottom:'230px',right:'15px'}} height={'30px'} width={'30px'}  onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />:
            <div style={{position:'absolute',bottom:'230px',right:'15px',display:'flex',backgroundColor:'white',borderRadius:'50px',padding:'6px',gap:'10px'}}>
             <img height={'40px'} onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" /> 
             <p>{cartItems[id]}</p>
             <img height={'40px'} onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
          }
            <Card.Body>
              <Card.Title className='d-flex justify-content-between'>{name} 
              </Card.Title>
              <Card.Text>
              <span className='text-warning' style={{ fontSize: '0.8em' }}><i className="fa-solid fa-star" ></i> 
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </span>
               <p>
                {description}
               </p>
                <h3 className='mt-2 text-danger'>${price}</h3>
              </Card.Text>
             
            </Card.Body>
          </Card>
   </Col>
 



        
    </>
  )
}

export default Cards
