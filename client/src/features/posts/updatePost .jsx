import { useUpdatePostMutation } from "./postsApi"



const updatePost  = ({onClose}) => {
    const [updatedPost, { isLoading }] = useUpdatePostMutation();
    const handleSubmit = (e) => {
        e.preventDefault()
        if (e.target[0].value === "" || e.target[1].value === "") {
          alert("Please fill in both fields")
        } else {
          updatedPost({ post_title: e.target[0].value, post_content: e.target[1].value, author_id: 1 })
          e.target.reset();
        }
    
      }



  return (
    <div>
        <section>
            <h2>Update Ur Post</h2>
            <form onSubmit={handleSubmit} className="form">
            <label className="form-input" htmlFor="postTitle">Title:
                <input type="text" id="postTitle" name="postTitle" />
            </label>
            <label className="form-input" htmlFor="postContent">Content:
                <textarea id="postContent" name="postContent" />
            </label>
            <div className="updateBtn">
            <button className="upBtn" type="submit">{isLoading ? 'Loading' : ' Update Now'}</button>
            <button className="DltBtn" onClick={onClose}>close</button>
            </div>
            
            </form>
        </section>
     </div>
  )
}

export default updatePost 