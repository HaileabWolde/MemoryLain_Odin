import { useState, useEffect, useRef } from 'react';
import gotCharacters from '../components/gotCharacters';

export default function useMemoryGame(setModalState) {
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
       setModalState({
  show: true,
  data: (
    <div
      style={{
        textAlign: 'center',
        padding: '40px 20px',
        maxWidth: '550px',
        margin: '0 auto',
        fontFamily: '"Cinzel", "Garamond", serif',
        color: '#e8e0d0',
      }}
    >
      {/* Broken mask / fallen face emblem */}
      <div
        style={{
          width: '130px',
          height: '130px',
          margin: '0 auto 30px',
          background: '#1a1a1a',
          borderRadius: '50%',
          border: '6px solid #4a0000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(178, 34, 34, 0.6), inset 0 0 20px rgba(0,0,0,0.9)',
          position: 'relative',
        }}
      >
        <span style={{ fontSize: '80px', opacity: 0.7 }}>💀</span>
        {/* Cracks overlay effect */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, transparent 45%, rgba(178,34,34,0.3) 49%, rgba(178,34,34,0.3) 51%, transparent 55%)',
            borderRadius: '50%',
            transform: 'rotate(30deg)',
          }}
        />
      </div>

      <h1
        style={{
          fontSize: '3.2rem',
          margin: '0 0 20px',
          fontWeight: '700',
          letterSpacing: '3px',
          color: '#b22222',
          textShadow: '0 0 15px rgba(178, 34, 34, 0.8), 2px 2px 10px rgba(0,0,0,0.9)',
        }}
      >
        Failure
      </h1>

      <h2
        style={{
          fontSize: '1.8rem',
          margin: '0 0 35px',
          color: '#a0a0a0',
          fontStyle: 'italic',
        }}
      >
        A girl has chosen a face she already knew.
      </h2>
      <p
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          margin: '45px 0 40px',
          color: '#8b0000',
          letterSpacing: '2px',
          textShadow: '0 0 12px rgba(139, 0, 0, 0.7)',
        }}
      >
        Valar Morghulis
      </p>

      <button
        onClick={() => setModalState({ show: false, data: null })}
        style={{
          background: 'linear-gradient(to bottom, #4a0000, #2a0000)',
          color: '#e0e0e0',
          border: '2px solid #8b0000',
          borderRadius: '10px',
          padding: '16px 40px',
          fontSize: '1.4rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(178, 34, 34, 0.5)',
          transition: 'all 0.3s ease',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to bottom, #8b0000, #4a0000)';
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(139, 0, 0, 0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to bottom, #4a0000, #2a0000)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(178, 34, 34, 0.5)';
        }}
      >
        Try Again
      </button>
    </div>
  ),
});
         setVisitedCharacters([])
       currentScore.current = 0;
        return true;
      }
    
      return false;

    }
  }

  const checkWinning = (shuffledArr)=> {
   if(currentScore.current === shuffledArr.length && shuffledArr.length > 0){
                 setModalState({
                    show: true,
                  data: (
              <div
                 style={{
                       textAlign: 'center',
                       padding: '40px 20px',
                       maxWidth: '550px',
                         margin: '0 auto',
                         fontFamily: '"Cinzel", "Garamond", serif',
                     color: '#e8e0d0',
                  }}
    >
      {/* Victory Emblem - Iron Throne or Valyrian Steel vibe */}
      <div
        style={{
          width: '100px',
          height: '100px',
          margin: '0 auto 30px',
          background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
          borderRadius: '50%',
          border: '5px solid #d4af37',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), inset 0 0 20px rgba(0,0,0,0.8)',
        }}
      >
        <span style={{ fontSize: '70px' }}>⚔️</span> {/* Crossed swords for victory */}
      </div>
      <h2
        style={{
          fontSize: '1.9rem',
          color: '#c0c0c0',
          fontStyle: 'italic',
        }}
      >
        {
          cardCount.current < 12 &&  `A girl has no name... but she remembers all faces.` 
        }
       
      </h2>
s
      <p
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#d4af37',
          letterSpacing: '3px',
          textShadow: '0 0 12px rgba(212, 175, 55, 0.7)',
        }}
      >
        {
          cardCount.current >= 12 && " Valar Dohaeris"
        }
       
      </p>

      {/* Dynamic level message */}
      <p
        style={{
          fontSize: '1.3rem',
          color: '#a0a0a0',
          marginBottom: '30px',
        }}
      >
        {cardCount.current >= 12 
          ? "Finally A girl is no One."
          : `Next challenge: ${cardCount.current + 2} faces await...`
        }
      </p>

      <button
        onClick={() => setModalState({ show: false, data: null })}
        style={{
          background: 'linear-gradient(to bottom, #d4af37, #b8860b)',
          color: '#1a1a1a',
          border: 'none',
          borderRadius: '10px',
          padding: '16px 40px',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(212, 175, 55, 0.5)',
          transition: 'all 0.3s ease',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          minWidth: '220px',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.7)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.5)';
        }}
      >
        Continue the Path
      </button>
    </div>
  ),
});
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