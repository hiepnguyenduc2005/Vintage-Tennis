import React from 'react';
import { useState } from 'react';
import './Edit.css'
import { supabase } from '../Client'
import { useParams } from 'react-router-dom';


const Repost = () => {

    const {id} = useParams();
    const [post, setPost] = useState({title: "", content: "", image: "", password: "", question: false, repost: id})
    const [uploading, setUploading] = useState(false);

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        setPost(prev => {
            return {
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            };
        });
    };

    const handleFileChange = async (event) => {
        setUploading(true);
        const file = event.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        let { error: uploadError } = await supabase.storage.from('images').upload(fileName, file);
    
        if (uploadError) {
          setUploading(false);
          console.error('Error uploading file:', uploadError);
          return;
        }
        let { data, error: urlError } = supabase.storage.from('images').getPublicUrl(fileName);
        if (urlError) {
        setUploading(false);
        console.error('Error getting file URL:', urlError);
        return;
        }
        
        const publicURL = data.publicUrl;
        // Set the public URL to the image property of the post
        setPost(prev => ({
        ...prev,
        image: publicURL
        }));
        setUploading(false);

    };
    
    
    const createPost = async (event) => {
        event.preventDefault();
        if (uploading) return;

        const userID = localStorage.getItem('userID');
      
        await supabase
          .from('Tennis')
          .insert({title: post.title, content: post.content, image: post.image, password: post.password, question: post.question, user_id: userID, repost: post.repost})
          .select();
      
        window.location = "/";

        console.log("Post created");
      }

    return (
        <div>
            <form onSubmit={createPost} className='create'>
                <input type="text" id="title" name="title" onChange={handleChange} placeholder='Title' autoFocus/><br />
                <br />

                <textarea rows="4" cols="50" type="text" id="content" name="content" onChange={handleChange} placeholder='Content'/><br />
                <br />

                <input type="text" id="image" name="image" value={post.image} onChange={handleChange} placeholder='Image/Video URL' disabled={uploading} /><br />
                <br />
                <label>
                Or upload an image:
                <input type="file" id="file" onChange={handleFileChange} disabled={uploading} />
                </label>
                <br />

                <input type="password" id="password" name="password" onChange={handleChange} placeholder='Password'/><br />
                <br />

                <div className="question-item">
                    <label htmlFor="question">Is it a question?</label>
                    <input
                        type="checkbox"
                        id="question"
                        name="question"
                        checked={post.question || false} // Ensure the checked attribute is controlled
                        onChange={handleChange}
                    /><br />
                </div>

                <input type="submit" value="Submit" onClick={createPost}  disabled={uploading} />
            </form>
        </div>
    )
}

export default Repost