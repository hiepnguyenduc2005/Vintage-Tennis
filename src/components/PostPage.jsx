// ... Other imports
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../Client';

const PostPage = () => {
  const { id } = useParams(); // The id of the post
  const [post, setPost] = useState(null); // State for the post data
  const [comments, setComments] = useState([]); // State for the comments
  const [newComment, setNewComment] = useState(""); // State for a new comment

  useEffect(() => {
    // Fetch post data
    // Fetch comments data
    const fetchComments = async () => {
      const { data: commentsData, error } = await supabase
        .from('Tennis')
        .select('comments')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching comments', error);
      } else {
        setComments(commentsData.comments);
      }
    };
    
    fetchComments();
  }, [id]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const submitComment = async (event) => {
    event.preventDefault();
    
    // Update the comments array in the database
    const { data, error } = await supabase
      .from('Tennis')
      .update({ comments: [...comments, newComment] })
      .eq('id', id);
    
    if (error) {
      console.error('Error submitting comment', error);
    } else {
      setComments([...comments, newComment]);
      setNewComment(""); // Reset the new comment input
    }
  };

  return (
    <div>
      {/* ... Display the post ... */}
      
      {/* Display existing comments */}
      <div>
        {comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </div>

      {/* Form for submitting a new comment */}
      <form onSubmit={submitComment}>
        <textarea value={newComment} onChange={handleCommentChange} />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default PostPage;
