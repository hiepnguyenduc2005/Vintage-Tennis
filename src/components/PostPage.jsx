// ... Other imports
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../Client';
import './Edit.css';

const PostPage = () => {
  const { id } = useParams(); // The id of the post
  const [comments, setComments] = useState([]); // State for the comments
  const [newComment, setNewComment] = useState(""); // State for a new comment

  useEffect(() => {
    // Fetch post data
    // Fetch comments data
    const fetchComments = async () => {
      const { data: commentsData, error } = await supabase
        .from('Tennis')
        .select('comment')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching comments', error);
      } else {
        setComments(commentsData.comment);
      }
    };
    
    fetchComments();
  }, [id]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const submitComment = async (event) => {
    event.preventDefault();
    const userID = localStorage.getItem('userID');
    if (comments === null || comments.length === 0) {
      const { data, error } = await supabase
      .from('Tennis')
      .update({ comment: [{[userID]: newComment}] })
      .eq('id', id);
    
      if (error) {
        console.error('Error submitting comment', error);
      } else {
        setComments([{[userID]: newComment}]);
        setNewComment(""); // Reset the new comment input
      }
    }
    else  {
      // Update the comments array in the database
      const { data, error } = await supabase
        .from('Tennis')
        .update({ comment: [...comments, {[userID]: newComment}] })
        .eq('id', id);
      
      if (error) {
        console.error('Error submitting comment', error);
      } else {
        setComments([...comments, {[userID]: newComment}]);
        setNewComment(""); // Reset the new comment input
      }
    }
  };

  return (
    <div style= {{width: '100%'}}>
      <h3 style={{textAlign: 'left'}}>Comments</h3>
      {/* ... Display the post ... */}
      { (comments === null || comments.length === 0)
      ? <p>No comments yet</p> 
      : 
        <ul style= {{textAlign: 'left'}}>
        {comments.map((comment, index) => (
          <li key={index}><i>User <b>{Object.keys(comment)[0]}</b>:</i> {comment[Object.keys(comment)[0]]}</li>
        ))}
      </ul>
      }
      {/* Display existing comments */}

      {/* Form for submitting a new comment */}
      <form onSubmit={submitComment}>
        <textarea value={newComment} onChange={handleCommentChange} placeholder='Leave a new comment' /><br />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default PostPage;
