import React from 'react'


function Header() {
   
  return (
    <>
        <div className='d-flex justify-content-between'>
             <span style={{ fontFamily: " 'Lobster', sans-seri" ,fontSize:'30px'}}>Fast Food <i className="fa-solid fa-burger"></i></span>
                 <h6 className='mt-3'>Admin Panel</h6>
                 <span><img   style={{ width: '50px', height: '50px', borderRadius: '50%' }} src="https://img.freepik.com/free-vector/tiktok-profile-picture-template_742173-4482.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1714348800&semt=ais" alt="" /> </span>
                
        </div>
      
        <hr />
    </>
  )
}

export default Header