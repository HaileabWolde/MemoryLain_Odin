import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);
 const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true);
 
  
  useEffect(()=>{
    async function getGameofThronesAPI(){
      try {
          const response = await fetch('https://thronesapi.com/api/v2/Characters')
          if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const result  = await response.json()
           setCharacters(result)
           setError(null)
      } 
      catch(err){
        console.error("Fetching error:", err)
        setError(err.message)
        setCharacters([]);
      }
      finally {
        setLoading(false);
      }
     
    }
    getGameofThronesAPI()
  }, [])


  if (isLoading) {
   
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
   <>
  <h1>Hello MotherFucker</h1>
   </>
  )

}

export default App
