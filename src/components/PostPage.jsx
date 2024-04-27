// ... Other imports
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../Client';

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
        console.log(comments);
      }
    };
    
    fetchComments();
  }, [id]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const submitComment = async (event) => {
    event.preventDefault();
    if (comments === null || comments.length === 0) {
      const { data, error } = await supabase
      .from('Tennis')
      .update({ comment: [newComment] })
      .eq('id', id);
    
      if (error) {
        console.error('Error submitting comment', error);
      } else {
        setComments([newComment]);
        setNewComment(""); // Reset the new comment input
      }
    }
    else  {
      // Update the comments array in the database
      const { data, error } = await supabase
        .from('Tennis')
        .update({ comment: [...comments, newComment] })
        .eq('id', id);
      
      if (error) {
        console.error('Error submitting comment', error);
      } else {
        setComments([...comments, newComment]);
        setNewComment(""); // Reset the new comment input
      }
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      {/* ... Display the post ... */}
      { (comments === null || comments.length === 0)
      ? <p>No comments yet</p> 
      : 
        <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      }
      {/* Display existing comments */}

      {/* Form for submitting a new comment */}
      <form onSubmit={submitComment}>
        <label htmlFor="comment">New Comment:</label>
        <textarea value={newComment} onChange={handleCommentChange} />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default PostPage;
