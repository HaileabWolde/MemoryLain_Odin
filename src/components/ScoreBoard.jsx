const ScoreBoard = ({currentScore, bestScore})=>{
return (
     <div className="scores-container">  {/* New wrapper */}
                <div className='yourBoard'>
                      <p>Your Score: {currentScore}</p>
                </div>
               <div className='bestBoard'>
                    <p>Best Score: {bestScore}</p>
               </div>
           </div>
)
}
export default ScoreBoard;