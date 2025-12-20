import { useState, useEffect, useRef } from 'react';
import gotCharacters from '../components/gotCharacters';
export default function useMemoryGame() {
  const [characters, setCharacters] = useState([]);
  const [shufflingArray, setShufflingArray] = useState([]);
  const [visitedCharacters, setVisitedCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentScore = useRef(0);
  const [bestScore, setBestScore] = useState(0);
  const cardCount = useRef(6); // starts with 6 cards

  // ... all your fetch logic, shuffle, handleClick, etc.
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
        setIsLoading(false);
      }
     
    }
    getGameofThronesAPI()
  }, [])


  useEffect(() => {
  if (currentScore.current > bestScore) {
    setBestScore(currentScore.current);
  }
}, [currentScore.current, bestScore]); // Note: yourscore.current won't trigger, so better way:
  


  const checkcharacter = (id)=> {
    if(visitedCharacters.length > 0){
      if(visitedCharacters.find(character=> character.id === id)){
        alert('Game over')
         setVisitedCharacters([])
       currentScore.current = 0;
        return true;
      }
    
      return false;

    }
  }

  const checkWinning = (shuffledArr)=> {
   if(currentScore.current === shuffledArr.length && shuffledArr.length > 0){
               alert('Fuck You Have won')
               setVisitedCharacters([])
                currentScore.current = 0;
              cardCount.current >= 12 ? 
               cardCount.current = 6 : cardCount.current = cardCount.current + 2
               
       return true;
   }  
       
     
  }

 const shuffleArray = (id)=> {
   
    let shuffledArr = [...characters].slice(0, cardCount.current)
    
    
    if(!checkcharacter(id, shuffledArr)){
     
        let findChar = characters.find((item)=> item.id === id)
           setVisitedCharacters(prev=> [
        ...prev, findChar])
        currentScore.current  = currentScore.current + 1; 
        checkWinning(shuffledArr)
    }
    shuffledArr = [...characters].slice(0, cardCount.current)
    
   for (let i = shuffledArr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i inclusive
    const j = Math.floor(Math.random() * (i + 1)); 
    // Swap elements array[i] and array[j] using destructuring assignment
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
 
  setShufflingArray(shuffledArr)
  
  }

  



  return {
    characters: shufflingArray.slice(0, cardCount.current),
    currentScore: currentScore.current,
    bestScore,
    isLoading,
    error,
    cardCount: cardCount.current,
    shuffleArray : shuffleArray 
  };
}