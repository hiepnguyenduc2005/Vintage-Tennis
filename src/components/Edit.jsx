import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Edit.css'
import { supabase } from '../Client'


const Edit = () => {

    const {id} = useParams();
    const [post, setPost] = useState({title: "", content: "", image: "", password: "", question: false})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

      useEffect(() => {
        // Function to fetch post data
        const fetchPost = async () => {
          const { data, error } = await supabase
            .from('Tennis')
            .select()
            .eq('id', id)
            .single();
          
          if (error) {
            console.log('Error fetching post:', error);
          } else {
            setPost(data);
          }
        };
    
        fetchPost();
      }, [id]); 


    const updatePost = async (event) => {
        event.preventDefault();
      
        await supabase
        .from('Tennis')
        .update({title: post.title, content: post.content, image: post.image, password: post.password, question: Boolean(post.question)})
        .eq('id', id);
      
        window.location = "/";
    }
    
    const deletePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Tennis')
          .delete()
          .eq('id', id); 
      
        window.location = "/";
    }

    return (
        <div>
            <h1>Update Your Post!</h1>
            <form>
            <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" value = {post.title} onChange={handleChange} /><br />
                <br/>

                <label for="content">Content</label> <br />
                <textarea rows="4" cols="50" type="text" id="content" name="content" value = {post.content} onChange={handleChange} /><br />
                <br/>

                <label for="image">Image URL</label> <br />
                <input type="text" id="image" name="image" value = {post.image} onChange={handleChange} /><br />
                <br/>

                <label for="password">Password</label> <br />
                <input type="text" id="password" name="password" value = {post.password} onChange={handleChange} /><br />

                <label for="question">Question?</label><br />
                <input type="checkbox" id="question" name="question" value = {post.question} onChange={handleChange} /><br />

                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default Edit