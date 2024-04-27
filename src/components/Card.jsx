import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'


const Card = (props) =>  {

  const time = new Date(props.time).toLocaleString();
  return (
      <div className="Card">
          <Link to={'/post/'+ props.id}>
            <p className="time"><i>{"Posted at " + time}</i></p>
            <h2 className="title">{props.title}</h2>
            <p className="vote">{props.vote + " upvotes" }</p>
          </Link>
      </div>
  );
};

export default Card;