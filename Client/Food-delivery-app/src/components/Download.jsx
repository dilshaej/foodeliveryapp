import React from 'react'

function Download() {
  return (
    <div className='d-flex justify-content-center text-align-center'>
  <button className='btn btn-dark d-flex align-items-center justify-content-start' style={{ width: '200px' }}>
    <i className="fa-brands fa-apple" style={{ fontSize: '50px' }}></i>
  
    Download on the App Store
</button>

<button className='btn btn-dark d-flex align-items-center justify-content-start ms-5' style={{ width: '200px' }}>
<i className="fa-brands fa-google-play" style={{ fontSize: '40px' }}></i>
  
   Get It On <br />
    Google Play
</button>
</div>

 


  )
}

export default Download