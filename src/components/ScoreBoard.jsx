const ScoreBoard = ({currentScore, bestScore})=>{
return (
     <div className="scores-container">  {/* New wrapper */}
                <div className='yourBoard'>
                      <p style={{
                         fontWeight: '600'
                      }}>Your Score: {currentScore}</p>
                </div>
               <div className='bestBoard'>
                    <p
                    style={{
                         fontWeight: '600'
                    }}
                    >Best Score: {bestScore}</p>
               </div>
           </div>
)
}
export default ScoreBoard;