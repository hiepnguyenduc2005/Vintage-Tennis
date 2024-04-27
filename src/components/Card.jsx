import React from 'react'
import { useState } from 'react'
import './Card.css'
import { supabase } from '../Client'
import { Link } from 'react-router-dom'


const Card = (props) =>  {

  const [count, setCount] = useState(props.vote)
  const updateCount = async (event) => {
    event.preventDefault();
  
    await supabase
      .from('Tennis')
      .update({ vote: count + 1})
      .eq('id', props.id)
  
    setCount((count) => count + 1);
  }

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