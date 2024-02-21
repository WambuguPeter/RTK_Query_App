import { useDeletePostMutation } from "../features/posts/postsApi";
import UpdatePost from "../features/posts/updatePost "; // Assuming UpdatePost is a component
import { useState } from "react";
import { createPortal } from 'react-dom';

const Post = ({ post }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
  };

  return (
    <article className='card' key={post._id}>
      <h3>{post.post_title}</h3>
      <p>{post.post_content.substring(0, 100)}</p>
      <p>Author: {post.author_id}</p>
      <div>
      <div className="updateBtn">
      <button className="upBtn" onClick={() => setShowUpdate(true)}>Update</button>
        {showUpdate && createPortal(
          <UpdatePost onClose={() => setShowUpdate(false)} />,
          document.body          
        )}
        <button className="DltBtn" onClick={handleDelete}>{isLoading ? 'Deleting...' : 'DELETE'}</button>
      </div>
        
        
      </div>
    </article>
  );
};

export default Post;
