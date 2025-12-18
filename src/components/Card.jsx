import './Card.css';

const Card = ({ 
    id, 
    imageName, 
    imageUrl,
    shuffleArray
 }) => {
    
    return (
        <div 
            className="card" 
            style={{
                backgroundImage: `url(${imageUrl})`,
                alt: {imageName},
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            onClick={()=> shuffleArray(id)}
        >
        
        </div>
    );
};

export default Card;