import '../../App.css'
import ClipLoader from "react-spinners/ClipLoader";
import Post from '../../components/Post'
import { useGetPostsQuery } from './postsApi'

const PostLists = () => {

  const { data: posts, error, isLoading, isError, isFetching } = useGetPostsQuery({refetchOnReconnect:true});

  return (
    <div>
      {isError && <div>Error: {error.data.message}</div>}
      {isLoading || isFetching && <ClipLoader color="#000" loading={true} size={150} />}
      <h2>Posts</h2>
      <section className='container'>
        {
          posts && posts.map((post, index) => (
            <Post key={index} post={post} />
          ))
        }
      </section>
    </div>
  )
}

export default PostLists