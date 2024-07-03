import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './Default.css';
import { useParams } from 'react-router-dom';
import { supabase } from '../Client';
import PostPage from './PostPage';
import Spinner from './Spinner';

const Post = () => {

    const {id} = useParams();
    const [post, setPost] = useState({title: "", content: "", image: "", password: "", vote: 0, created_at: "", user_id:"", repost: null, emotion: null});
    const [repost, setRepost] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [emotions, setEmotions] = useState("N/A");

    useEffect(() => {
        setIsLoading(true);
        const fetchPosts = async () => {
            const {data} = await supabase
              .from('Tennis')
              .select()
              .eq('id', id)
              .single();
          
            // set state of posts
            setPost(data);
            console.log(data);

            if (data.repost) {
              const { data: repostData, error: repostError } = await supabase
                .from('Tennis')
                .select()
                .eq('id', data.repost)
                .single();
              if (repostError) {
                throw repostError;
              }
              setRepost(repostData.title);
              console.log(repostData);
            }

            if (data.emotion !== null) {
              const track = {
                '0': 'sad',
                '1': 'joy',
                '2': 'love',
                '3': 'anger',
                '4': 'fear',
                '5': 'surprise',
              };
            
              // Convert post.emotion to a Set to ensure uniqueness
              const emotionSet = new Set(post.emotion);
            
              // Map the emotion indices to their corresponding names
              const emotionNames = Array.from(emotionSet).map(e => track[e]).join(", ");
            
              // Set the resulting emotion names string
              setEmotions(emotionNames);

              console.log(emotions);
            }

            setIsLoading(false);
          }
        fetchPosts();
    }, [id, emotions]);

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

    const isVideo = (url) => {
        return url.match(/\.(mp4|webm|ogg)$/i);
      };   
   
    const MediaComponent = () => {
        const youtubeMatch = post.image.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
        if (youtubeMatch && youtubeMatch[1]) {
          return (
            <iframe
              width="75%"
              height="315"
              src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
          );
        } else if (isVideo(post.image)) {
          return <video width="100%" controls src={post.image} alt="Post video" />;
        } else {
          return <img src={post.image} alt="Post" className="image" />;
        }
      };
      

    const time = new Date(post.created_at).toLocaleString();
    return (
        <div className="single">
            {isLoading ? (
                <Spinner /> // Render your spinner component here while loading
            ) : post ?
                <div style={{width:'100%'}}>
                   <div className="title-row">
                        <h1 className="title" style={{ textAlign: 'left' }}>{post.title}</h1>
                        <span className="emotion-label">{emotions}</span>
                    </div>                    <h4 className="stat" style={{textAlign: 'left'}}><i><strong>Posted:</strong> {time}</i></h4>
                    <h4 className="stat" style={{textAlign: 'left'}}><i><strong>by User:</strong> {post.user_id}</i></h4>
                    {post.repost 
                    ? <div style={{display: 'flex', justifyItems: 'left', alignItems: 'center'}}>
                      <h4 className="stat" style={{textAlign: 'left'}}  ><i><strong>Reference Post:&nbsp;</strong></i></h4>
                      <Link to={'/post/'+ post.repost} className='repost'>{repost}</Link> 
                      </div>
                    : null
                    }
                    <h4 className="content" style={{textAlign: 'left'}}>{post.content}</h4>
                    <MediaComponent /><br/><br/>
                    <button className="voteButton" onClick={updateCount} >👍{count}</button><br/><br/>
                    <Link to={`/repost/${post.id}`}><button className="voteButton">Repost</button></Link><br/><br/>
                    <form onSubmit={handleSubmit}>
                        <input type="password" id="password" name="password" onChange={handleChange} placeholder='Password'/>
                    </form><br/>
                    {post.password === password && post.user_id === localStorage.getItem('userID') ? (
                        <Link to={`/edit/${post.id}`}><button>Edit/Delete</button></Link>
                    ) : (
                        <p>Not Valid User or Password to Edit/Delete😞</p>
                    )}
                    <PostPage />
                </div>
            : <h2>{'Not Valid 😞'}</h2>
            }
                
        </div>  
    )
}

export default Post;