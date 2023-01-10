import React from 'react'


const Home = () => {
  return (
    <div className='hero'>
      <div className="card bg-dark text-white border-0">
        <img className="card-img" src="/images/background.jpg" alt="Background" height="750px" />
        <div className="card-img-overlay">
          <div className='container'>
            <h5 className="card-title display-3 fw-bolder mb-0">NEW SEASON STOCK</h5><br></br>
            <p className="card-text lead fs-2 text-dark">CHECK OUR NEW PRODUCTS</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

// References: https://getbootstrap.com/docs/4.0/components/card/
// image: https://unsplash.com/photos/kyD7I53MEuE