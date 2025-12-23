import './App.css'
import { useState } from 'react';
import Dialog from './components/dialog';
import Card from './components/Card';
import AudioPlayerComponent from './components/Audio';
import ScoreBoard from './components/ScoreBoard';
import useMemoryGame from './hooks/useMemoryGame';

function App() {

  const [modalState, setModalState] = useState({
  show: true,
  data: (
    <div className='dialogSection'
    >
      {/* Optional: Add a subtle House Stark direwolf vibe or banner feel */}
      <div className='banner'
      >
        <span >🐺</span> {/* Direwolf emoji as placeholder */}
      </div>

      <h1
       
      >
        Game of Thrones
      </h1>

      <h2
      >
        Memory Game
      </h2>

      <p
        
      >
        A man sees that you have come to help a girl.
        <br />
        Arya Stark must learn many faces,
        <br />
        <em>but she may not choose the same face twice.</em>
      </p>

      <p className='text'
      
      >
        Valar Morghulis
      </p>

      <button
        onClick={() => setModalState({ show: false, data: null })}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to bottom, #d4af37, #b8860b)';
          e.currentTarget.style.color = '#1a1a1a';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(212, 175, 55, 0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to bottom, #4a4a4a, #2a2a2a)';
          e.currentTarget.style.color = '#d4af37';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.6)';
        }}
      >
        Begin the Game
      </button>
    </div>
  ),
});
 const {
    isLoading,
      error,
  characters,
  currentScore,
   bestScore,
  shuffleArray,
  cardCount
 } = useMemoryGame(setModalState);



 

  if (isLoading) {
   
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
   <div className='Container'>
         <Dialog
         modalState= {modalState}
         />
      <div className='Board'>
           <AudioPlayerComponent
       src="./audio/GOT.mp3"
       />
         
      <ScoreBoard
      currentScore= {currentScore}
       bestScore = { bestScore}
      />
      </div>
      <div className='allCharacters'>
           {
        characters.slice(0, cardCount.current).map((character)=> {
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
