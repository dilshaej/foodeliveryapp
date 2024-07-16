import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Download from '../components/Download'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay'

function Home() {
    const [category,setCategory] = useState("All")
  return (
    <div>
        {/* <Header/> */}
        <div className='p-5 mt-5 container rounded' style={{
           backgroundImage: 'url("https://madangh1.kenzap.com/images/home-banner2.jpg")',
           backgroundSize: 'cover', 
           backgroundPosition: 'center',
           height:'500px',

        }}>
<div style={{color:'black',textAlign:'right'}}>
    <h1 style={{color:'black'}}>Order your  favourite <br /> food here</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />  Architecto numquam error harum sequi id ut! Ullam iure <br />eveniet asperiores odio at praesentium possimus beatae <br /> inventore cupiditate quaerat, perspiciatis, esse <br /> repellendus?</p>
    <button style={{borderRadius:'60px'}} className='btn btn-danger'> view Menu</button>
</div>
        </div>

      <div className='container'>
           <div className='p-5 text-center conatiner ' id='explore-menu'>
            <h2>Explore Our Menu</h2>
             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia sunt <br />
                 suscipit beatae temporibus! Non nostrum sapiente culpa 
                  animi ipsa <br /> neque assumenda tenetur  Ratione minima porro delectus labore <br /> non dolorum necessitatibus!</p>
                 <ExploreMenu category={category} setCategory={setCategory}/>
                  <hr />
                  
      </div>

        </div> 
        <div className='container'>
            <h2>Top dishes near you</h2>
<FoodDisplay category={category}/>

           </div>
           <div className='container text-center p-5'>
            <h2>For Better Experience Download <br />
                 Fast Food App</h2>
                 <Download/>
           </div>
        {/* <Footer/> */}
    </div>
  )
}

export default Home
