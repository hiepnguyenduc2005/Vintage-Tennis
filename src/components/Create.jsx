import React from 'react';
import { useState } from 'react';
import './Edit.css'
import { supabase } from '../Client'


const Create = () => {

    const [post, setPost] = useState({title: "", content: "", image: "", password: "", question: false})

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        setPost(prev => {
            return {
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            };
        });
        console.log(post);
    };

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Tennis')
          .insert({title: post.title, content: post.content, image: post.image, password: post.password, question: post.question})
          .select();
      
        window.location = "/";

        console.log("Post created");
      }

    return (
        <div>
            <h1>Create Your Post!</h1>
            <form onSubmit={createPost} className='create'>
                <input type="text" id="title" name="title" onChange={handleChange} placeholder='Title' autoFocus/><br />
                <br />

                <textarea rows="4" cols="50" type="text" id="content" name="content" onChange={handleChange} placeholder='Content'/><br />
                <br />

                <input type="text" id="image" name="image" onChange={handleChange} placeholder='Image URL'/><br />
                <br />

                <input type="password" id="password" name="password" onChange={handleChange} placeholder='Password'/><br />
                <br />

                <div className="question-item">
                    <label for="question">Is it a question?</label>
                    <input
                        type="checkbox"
                        id="question"
                        name="question"
                        checked={post.question || false} // Ensure the checked attribute is controlled
                        onChange={handleChange}
                    /><br />
                </div>

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default Create