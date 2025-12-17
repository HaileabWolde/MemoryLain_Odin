import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card';

function App() {
  const [characters, setCharacters] = useState([]);
  const [vistedCharacter, setVistedCharacter] = useState([]);
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

  const shuffleArray = ()=> {
    const shuffledArr = [...characters]
   for (let i = shuffledArr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i inclusive
    const j = Math.floor(Math.random() * (i + 1)); 
    // Swap elements array[i] and array[j] using destructuring assignment
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
  setCharacters(shuffledArr)
  }


  if (isLoading) {
   
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
   <div className='Container'>
  {
    characters.slice(0, 6).map((character)=> {
   
      return (
       <Card
       id={character.id}
       key={character.id}
       image = {character.image}
       imageUrl = {character.imageUrl}
       shuffleArray= {shuffleArray}
       />
      )
    })
  }
   </div>
  )

}

export default App
