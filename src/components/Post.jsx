import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './Default.css';
import { useParams } from 'react-router-dom';
import { supabase } from '../Client';
import PostPage from './PostPage';


const Post = () => {

    const {id} = useParams();
    const [post, setPost] = useState({title: "", content: "", image: "", password: "", vote: 0, created_at: ""});

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
              .from('Tennis')
              .select()
              .eq('id', id)
              .single();
          
            // set state of posts
            setPost(data)
            console.log(post);
          }
        fetchPosts();
    }, [id]);


    const [count, setCount] = useState(0);
    const [password, setPassword] = useState("");

    useEffect(() => {
        setCount(post.vote);
    }, [post.vote]);

    const updateCount = async () => {
        await supabase
          .from('Tennis')
          .update({vote: count+1})
          .eq('id', id);
        setCount(count+1);
    }

    const handleChange = (event) => {
        setPassword(event.target.value);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault(); 
    }

    const time = new Date(post.created_at).toLocaleString();
    return (
        <div className="single">
            {
                post ?
                    <div style= {{height: 'auto'}}>
                        <h1 className="title">{post.title}</h1>
                        <h4 className="stat"><i><strong>Posted:</strong> {time}</i></h4>
                        <h3 className="content">{post.content}</h3>
                        <img src={post.image} alt="Post" className="image" />
                        <h3 className="stat">Vote: {count}</h3>
                        <form onSubmit={handleSubmit}>
                            <label for="password">Password</label> <br />
                            <input type="password" id="password" name="password" onChange={handleChange}/>
                        </form>
                        {post.password === password ? (
                            <Link to={`/edit/${post.id}`}><button>Edit/Delete</button></Link>
                        ) : (
                            <p>Not Valid Password to Edit/Delete😞</p>
                        )}
                        
                    </div>
                : <h2>{'Not Valid 😞'}</h2>
            }
            <button className="voteButton" onClick={updateCount} >👍 Vote Count: {count}</button> <br/><br/>
            <PostPage />
        </div>  
    )
}

export default Post;