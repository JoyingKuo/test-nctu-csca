import React from 'react'
import img0 from '../../../Resources/index01.jpg'
import img1 from '../../../Resources/index02.png'
import img2 from '../../../Resources/index03.png'
import img3 from '../../../Resources/index04.png'
import './Home.css'

class Mentor extends React.Component {
  render () {
    return (
      <div >
        <img style={{cursor: 'pointer'}} src={img0} className='image' />
        <img style={{cursor: 'pointer'}} src={img1} className='image' />
        <img style={{cursor: 'pointer'}} src={img2} className='image' />
        <img src={img3} className='image' />
      </div>
    )
  }
}

export default Mentor
