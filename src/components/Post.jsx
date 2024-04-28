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
                    <div style={{width:'100%'}}>
                        <h1 className="title" style={{textAlign: 'left'}}>{post.title}</h1>
                        <h4 className="stat" style={{textAlign: 'left'}}><i><strong>Posted:</strong> {time}</i></h4>
                        <h4 className="content" style={{textAlign: 'left'}}>{post.content}</h4>
                        <img src={post.image} alt="Post" className="image" /><br/><br/>
                        <button className="voteButton" onClick={updateCount} >👍{count}</button><br/><br/>
                        <form onSubmit={handleSubmit}>
                            <input type="password" id="password" name="password" onChange={handleChange} placeholder='Password'/>
                        </form><br/>
                        {post.password === password ? (
                            <Link to={`/edit/${post.id}`}><button>Edit/Delete</button></Link>
                        ) : (
                            <p>Not Valid Password to Edit/Delete😞</p>
                        )}
                        <PostPage />
                    </div>
                : <h2>{'Not Valid 😞'}</h2>
            }
        </div>  
    )
}

export default Post;