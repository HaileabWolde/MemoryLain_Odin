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
    <div
      style={{
        textAlign: 'center',
        padding: '40px 20px',
        maxWidth: '500px',
        margin: '0 auto',
        fontFamily: '"Cinzel", "Garamond", serif', // Elegant, GoT-like font feel
        color: '#e8e0d0',
      }}
    >
      {/* Optional: Add a subtle House Stark direwolf vibe or banner feel */}
      <div
        style={{
          width: '100px',
          height: '100px',
          margin: '0 auto 20px',
          background: '#2a2a2a',
          borderRadius: '50%',
          border: '4px solid #8b8b8b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(139, 139, 139, 0.5)',
        }}
      >
        <span style={{ fontSize: '50px', opacity: 0.6 }}>🐺</span> {/* Direwolf emoji as placeholder */}
      </div>

      <h1
        style={{
          fontSize: '2rem',
          margin: '0 0 24px',
          fontWeight: '700',
          letterSpacing: '2px',
          textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
          color: '#d4af37', // Gold for nobility/thrones
        }}
      >
        Game of Thrones
      </h1>

      <h2
        style={{
          fontSize: '1rem',
          margin: '0 0 30px',
          color: '#c0c0c0',
          fontWeight: '500',
        }}
      >
        Memory Game
      </h2>

      <p
        style={{
          fontSize: '1.2rem',
          color: '#e0e0e0',
        }}
      >
        A man sees that you have come to help a girl.
        <br />
        Arya Stark must learn many faces,
        <br />
        <em>but she may not choose the same face twice.</em>
      </p>

      <p
        style={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          color: '#b22222', // Blood red for drama
          textShadow: '0 0 10px rgba(178, 34, 34, 0.6)',
          letterSpacing: '3px',
        }}
      >
        Valar Morghulis
      </p>

      <button
        onClick={() => setModalState({ show: false, data: null })}
        style={{
          background: 'linear-gradient(to bottom, #4a4a4a, #2a2a2a)',
          color: '#d4af37',
          border: '2px solid #8b8b8b',
          borderRadius: '8px',
          padding: '14px 32px',
          fontSize: '1.3rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 6px 15px rgba(0,0,0,0.6)',
          transition: 'all 0.3s ease',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}
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
