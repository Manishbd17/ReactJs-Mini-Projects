import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [food,setFood] = useState(''); 
  const [shoppingList,setShoppingList] = useState([]); 
  const [bucketList,setBucketList] = useState([]); 

  const handleInput = (e) => {
    setFood(e.target.value);
  }

  const fetchItems = async (food) =>{
    const url = `https://api.frontendeval.com/fake/food/${food}`; 
    const result = await fetch(url); 
    const data = await result.json();
    setShoppingList(data);  
  }

  const handleShoppingList = (e) => {
    const idx = e.target.getAttribute('data-id');
    if(idx) {
      const obj = {
        id: Date.now(),
        data: shoppingList[idx],
        isDone: false
      }
      const copyBucktList = [...bucketList]; 
      copyBucktList.push(obj); 
      setBucketList(copyBucktList); 
    }
  }

  const handleRightClick = (id) => {
    const copyBucktList = [...bucketList]; 
    const newBucketList = copyBucktList.map((item) => {
      if(item.id==id) {
        item.isDone = !item.isDone; 
      }
      return item;
    }); 
    setBucketList(newBucketList); 
  }

  const handleDelete = (id) => {
    const conpyBucketList = [...bucketList]; 
    const newList = copyBucktList.filter((item) => item.id!=id); 
    setBucketList(newList); 
  }

  const handleActions = (e) =>{
    const action = e.target.getAttribute('data-id'); 
    const [type,id] = action.split(':'); 
    if(type=='update') {
      handleRightClick(id);
    } else if(type=='delete') {
      handleDelete(id);
    }
  }

  useEffect(()=>{
    if(food.length>=2) {
      fetchItems(food); 
    }
  },[food]);

  return (
    <>
      <div className='App'>
        <h1>My Shopping List</h1>
        <div>
          <input value={food} onChange={handleInput}/>
        </div>

        { food.length >=2  ? 
        <div className='shopping-list' onClick={handleShoppingList}>
          {
            shoppingList.map((item,index) => {
              return <div className='product' data-id={index}> 
                {item}
              </div>
            })
          }
        </div> : null
        }


        <div className='bucket' onClick={handleActions}>
          {
            bucketList.map((item) => {
              return (
                <div className='shopping-item'>
                  <button
                   data-id={`update:${item.id}`}
                   //onClick={handleRightClick(item.id)}
                   >✓</button>
                  <div className={item.isDone ? 'strik' : ''}>{item.data}</div>
                  <button 
                  data-id={`delete:${item.id}`}
                  //onClick={handleDelete(item.id)}
                  >X</button>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
