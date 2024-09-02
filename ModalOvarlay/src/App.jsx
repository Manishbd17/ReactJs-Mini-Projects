import { useState } from 'react'
import './App.css'
import Modal from './Modal';

function App() {
  const [show, setShow] = useState(false); 
  const [offerAccepted,setOfferAccepted] = useState(false); 

  const handleShowModal = () => {
    setShow(true); 
  }

  const handleOfferAccept = () =>{
    setOfferAccepted(true); 
    setShow(false); 
  }

  const handleClose = () => {
    setShow(false); 
  }

  return (
    <>
      <div>
        <div className='show-offer'>
          {!offerAccepted && <button onClick={handleShowModal} className="offer-btn">Show Offer</button>} 
          {offerAccepted && <div style={{fontSize: 50}}>Offer accepted</div>}
        </div>

        {show && <Modal handleClose={handleClose} handleOfferAccept={handleOfferAccept}/>}
      </div>
    </>
  )
}

export default App
