import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Edit.css'
import { supabase } from '../Client'



const Edit = () => {

    const {id} = useParams();
    const [post, setPost] = useState({title: "", content: "", image: "", password: "", question: true, comment: []})
    const [uploading, setUploading] = useState(false);

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
  
      setPost((prev) => ({
        ...prev,
        image: data.publicUrl, // Set the public URL as the image property
      }));
      setUploading(false);
    };

    
    const handleChange = (event) => {
      const { name, type, value, checked } = event.target;
      setPost(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
      }));
    };
  

    const [commentsToDelete, setCommentsToDelete] = useState({});

    const handleCheckboxChange = (index) => {
        setCommentsToDelete(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

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

          if (data && data.comment) {
            // Initialize the state with all comments unmarked for deletion
            const commentsToDeleteInit = data.comment.reduce((acc, _, index) => {
                acc[index] = false;
                return acc;
            }, {});
            setCommentsToDelete(commentsToDeleteInit);
          }

        };
    
        fetchPost();
      }, [id]); 

      

      const updatePost = async (event) => {
        event.preventDefault();
        const userID = localStorage.getItem('userID');
        // Create a new array excluding the comments marked for deletion.
        let remainingComments = [];
        if (Array.isArray(post.comment)) {
          remainingComments = post.comment.filter((_, index) => 
          !commentsToDelete[index]
        );
        }        
      
        const updates = {
          title: post.title,
          content: post.content,
          image: post.image,
          password: post.password, // Ensure that password handling is secure and necessary
          question: post.question,
          comment: remainingComments,
          user_id: userID
        };
            
        const { error } = await supabase
          .from('Tennis')
          .update(updates)
          .eq('id', id);
      
        if (error) {
          console.error('Error updating post:', error);
        } else {
            window.location = "/"; 
        }
      };
      
    
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
            <form onSubmit={updatePost} className='create'>
            
                <input type="text" id="title" name="title" value = {post.title} onChange={handleChange} placeholder='Title'/><br />
                <br/>

                <textarea rows="4" cols="50" type="text" id="content" name="content" value = {post.content} onChange={handleChange} placeholder='Content' /><br />
                <br/>

                <input
                  type="text"
                  id="image"
                  name="image"
                  value={post.image}
                  onChange={handleChange}
                  placeholder='Image/Video URL'
                  disabled={uploading}
                /><br />
                <label>
                  Or upload an image:
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                </label>

                <input type="password" id="password" name="password" value = {post.password} onChange={handleChange} placeholder='Password'/><br />
                <br/>

                <div className="question-item">
                    <label htmlFor="question">Is it a question?</label>
                    <input
                        type="checkbox"
                        id="question"
                        name="question"
                        checked={post.question} // This should be checked based on the boolean value
                        onChange={handleChange} // This will toggle the boolean value
                    /><br />
                </div>

                <h3>Comments</h3>
                <div className="comment-container">
                    <div className="comment">
                    {
                        post.comment && post.comment.map((comment, index) => (
                            <div key={index} className="comment-item">
                                <input
                                    type="checkbox"
                                    checked={commentsToDelete[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <span className="comment-text"><i>User <b>{Object.keys(comment)[0]}</b>:</i> {comment[Object.keys(comment)[0]]}</span><br/>
                            </div>
                        ))
                    }
                    </div>
                </div>
                <input type="submit" value="Submit" disabled={uploading}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default Edit