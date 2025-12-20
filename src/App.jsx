import { useEffect, useRef, useState } from 'react'
import './App.css'
import Card from './components/Card';
import AudioPlayerComponent from './components/Audio';
import gotCharacters from './components/gotCharacters';
function App() {
  const [characters, setCharacters] = useState([]);
  const [vistedCharacter, setVistedCharacter] = useState([]);
  const [shufflingArray, setShufflingArray] = useState([])
 const [error, setError] = useState(null)
const [isLoading, setLoading] = useState(true);
const yourscore = useRef(0)
const [bestScore, setBestScore] = useState(0)
const countCharacters = useRef(6)
 
  
  useEffect(()=>{
    async function getGameofThronesAPI(){
      try {
          const response = await fetch('https://thronesapi.com/api/v2/Characters')
          if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const result  = await response.json()
          const sixteenCharacters = result.filter(character => gotCharacters.includes(character.fullName
          ));
           setCharacters(sixteenCharacters)
           setShufflingArray(sixteenCharacters)
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
useEffect(() => {
  if (yourscore.current > bestScore) {
    setBestScore(yourscore.current);
  }
}, [yourscore.current, bestScore]); // Note: yourscore.current won't trigger, so better way:


  const checkcharacter = (id)=> {
    if(vistedCharacter.length > 0){
      if(vistedCharacter.find(character=> character.id === id)){
        alert('Game over')
        setVistedCharacter([])
        yourscore.current = 0;
        return true;
      }
    
      return false;

    }
  }

  const checkWinning = (shuffledArr)=> {
   if(yourscore.current === shuffledArr.length && shuffledArr.length > 0){
               alert('Fuck You Have won')
               setVistedCharacter([])
               countCharacters.current >= 12 ? 
               countCharacters.current = 6 : countCharacters.current = countCharacters.current + 2
                yourscore.current = 0;
       return true;
   }  
       
     
  }

  const shuffleArray = (id)=> {
   
    let shuffledArr = [...characters].slice(0, countCharacters.current)
   
     
    
    if(!checkcharacter(id, shuffledArr)){
     
        let findChar = characters.find((item)=> item.id === id)
            setVistedCharacter(prev=> [
        ...prev, findChar])
        yourscore.current  = yourscore.current + 1; 
        checkWinning(shuffledArr)
    }
    shuffledArr = [...characters].slice(0, countCharacters.current)
    
   for (let i = shuffledArr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i inclusive
    const j = Math.floor(Math.random() * (i + 1)); 
    // Swap elements array[i] and array[j] using destructuring assignment
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
 
  setShufflingArray(shuffledArr)
  
  }







  if (isLoading) {
   
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
   <div className='Container'>
      <div className='Board'>
           <AudioPlayerComponent
       src="./audio/GOT.mp3"
       />
          <div className="scores-container">  {/* New wrapper */}
                <div className='yourBoard'>
                      <p>Your Score: {yourscore.current}</p>
                </div>
               <div className='bestBoard'>
                    <p>Best Score: {bestScore}</p>
               </div>
           </div>
      
      </div>
      <div className='allCharacters'>
           {
         shufflingArray.slice(0, countCharacters.current).map((character)=> {
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
