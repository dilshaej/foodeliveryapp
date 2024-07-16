import React, { useState } from 'react'
import { NavItem } from 'react-bootstrap'
import { menu_list } from '../assets/assets'
import '../index.css'
function ExploreMenu({category,setCategory}) {
  
  return (
    < >
     <div className=' container d-flex justify-content-space-between align-items-center text-align-center flex-row conatiner mt-5 menu  ' style={{gap:'20px'}}
     >
       {
        menu_list.map((item,index)=>{
            return(
                <div className='menu' onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}  key={index}>
                   <img className={category===item.menu_name?"active":""} width={'110px'} src={item.menu_image} alt="" />
                   <p>{item.menu_name}</p>
                </div>
            )
        })
       } 
     </div>





          

    </>
  )
}

export default ExploreMenu
