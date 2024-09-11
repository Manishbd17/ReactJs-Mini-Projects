import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [images,setImages] = useState([]); 
  const [index,setIndex] = useState(0); 
  const [loading,setLoading] = useState(false); 

  const fetchImages = async () => {
    setLoading(true);
    const url = 'https://www.reddit.com/r/aww/top/.json?t=all'; 
    const res = await fetch(url);
    const result = await res.json();
    const data = result.data.children;
    const list = data.filter((item) => item.data.url_overridden_by_dest.includes('.jpg')).map((item) => item.data.url_overridden_by_dest);
    setImages(list); 
    setLoading(false);
  }

  const handleClick = (dir) => {
    const lastIdx = images.length - 1; 
    if(dir==='left') {
      if(index===0) {
        setIndex(lastIdx); 
      } 
      else {
        setIndex((idx) => idx-1);
      } 
    } 
    else if (dir==='right') {
      if(index===lastIdx) {
        setIndex(0); 
      } else {
        setIndex((idx) => idx+1);
      }
    }
  }

  useEffect(() => {
    fetchImages(); 
  },[]);

  useEffect(() => {
    const tid = setInterval(() => {
      handleClick('right'); 
    },1000); 

    return () => {
      clearInterval(tid);
    }
  },[index]);

  return (
    <>
    { loading ? <div>Loading...</div> : 
      <div className='App'>
        <button onClick={() => handleClick('left')}>{'<'}</button>
        <img src = {images[index]} alt='not-found'/>
        <button onClick={() => handleClick('right')}>{'>'}</button>
      </div>
    }
    </>
  )
}

export default App
