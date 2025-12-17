import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card';

function App() {
  const [characters, setCharacters] = useState([]);
  const [vistedCharacter, setVistedCharacter] = useState([]);
 const [error, setError] = useState(null)
const [isLoading, setLoading] = useState(true);
const [yourscore, setScore] = useState(0)
const [bestScore, setBestScore] = useState(0)
 
 
  
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

  const checkcharacter = (id)=> {
    if(vistedCharacter.length > 0){
      if(vistedCharacter.find(character=> character.id === id)){
        alert('Game over')
        setVistedCharacter([])
        setBestScore(prev => yourscore > prev ? yourscore : prev)
        setScore(0);
        return true;
      }
    
      return false;

    }
  }
  const shuffleArray = (id)=> {
    if(!checkcharacter(id)){
        let findChar = characters.find((item)=> item.id === id)
            setVistedCharacter(prev=> [
        ...prev, findChar])
        setScore(prev => prev + 1)
       
    }
       
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
      <div className='scoreBoard'>
          <div className='yourBoard'>
              <p>Your Score:  {yourscore}</p>
          </div>
          <div className='bestBoard'>
              <p>Best Score: {bestScore}</p>
          </div>
      </div>
      <div className='allCharacters'>
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
 
   </div>
  )

}

export default App
