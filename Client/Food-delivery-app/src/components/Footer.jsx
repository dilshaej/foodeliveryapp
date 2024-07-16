 import React from 'react'
import { Link } from 'react-router-dom'

 function Footer() {
   return (
    <div className='text-black ' id='contact' style={{ backgroundColor: 'rgba(255, 99, 71, 1)', color: 'white', padding: '20px' }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ flexBasis: '300px' }}>
            <h5><span style={{ fontFamily: "'Lobster', sans-serif", fontSize: '30px' }}>Fast Food <i className="fa-solid fa-burger"></i></span></h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quia dolorem voluptate voluptatum.</p>
            <div>
                <a href="https://react.dev/" target="_blank" style={{ textDecoration: 'none', color: 'black', marginRight: '20px' }}><i className="fa-brands fa-linkedin fa-1x"></i></a>
                <a href="https://react.dev/" target="_blank" style={{ textDecoration: 'none', color: 'black', marginRight: '20px' }}><i className="fa-brands fa-twitter fa-1x"></i></a>
                <a href="https://react.dev/" target="_blank" style={{ textDecoration: 'none', color: 'black', marginRight: '20px' }}><i className="fa-brands fa-facebook-f"></i></a>
                <a href="https://react.dev/" target="_blank" style={{ textDecoration: 'none', color: 'black' }}><i className="fa-brands fa-github fa-1x"></i></a>
            </div>
        </div>
        <div className='d-flex flex-column text-black'>
            <h5>COMPANY</h5>
            <a href="/" target="_blank" style={{ textDecoration: 'none', color: 'black' }}>Home</a>
            <a href="/cart" target="_blank" style={{ textDecoration: 'none', color: 'black' }}>Menu</a>
            <a href="/wishlist" target="_blank" style={{ textDecoration: 'none', color: 'black' }}>Contact Us</a>
        </div>
        <div style={{ flexBasis: '200px' }}>
            <h5>GET IN TOUCH</h5>
            <p>+1-212-4500-7899</p>
            <p>contact@gmail.com</p>
        </div>
    </div>
    <p style={{ textAlign: 'center', marginTop: '20px' }}>Copyright 2024 @ Fast Food.com - All Right Reserved</p>
</div>

   )
 }
 
 export default Footer