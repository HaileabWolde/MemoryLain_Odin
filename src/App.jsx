import './App.css'
import Card from './components/Card';
import AudioPlayerComponent from './components/Audio';
import ScoreBoard from './components/ScoreBoard';
import useMemoryGame from './hooks/useMemoryGame';

function App() {
 const {
    isLoading,
      error,
  characters,
  currentScore,
   bestScore,
  shuffleArray,
  cardCount
 } = useMemoryGame();

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
