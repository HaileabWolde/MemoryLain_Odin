import './Card.css'
const Card = ({id, imageName, imageUrl})=> {
    return(
            <div className="card">
             <img
             src={imageUrl}
             alt={imageName}
              style={{ width: '200px', height: 'auto' }}
             />
            </div>
    )

}
export default Card