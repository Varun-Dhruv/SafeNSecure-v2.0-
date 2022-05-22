import React from 'react'
import './Card.css'

const Card = () => {
  return (
    <div className='card-container'>
      <div className="card">
        <div className="box">
          <div className="content">
            <h2>01</h2>
            <h3>Card One</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus autem recusandae, quis, nemo debitis iste, reprehenderit illo voluptatibus nostrum est magni animi sunt. </p>
            <a href="#">Read More</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card