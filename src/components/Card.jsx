import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'


const Card = (props) =>  {

  const time = new Date(props.time).toLocaleString();
  return (
      <div className="Card">
          <Link to={'/post/'+ props.id}>
            <h2 className="title">{props.title}</h2>
            <h3 className="time">{"Posted at " + time}</h3>
            <h3 className="vote">{props.vote + " upvotes" }</h3>
          </Link>
      </div>
  );
};

export default Card;