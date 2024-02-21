import { Router } from 'express';
const postRouter = Router();
import { getPosts, createPost, getPostById, deletePost, updatePost } from "../controllers/postController.js";
import { authMiddleware } from '../middlewares/userAuthMiddleware.js';

postRouter.get('/posts', getPosts);
postRouter.post('/posts', createPost);
postRouter.put('/posts/:id', updatePost);
postRouter.get('/posts/:id', getPostById);
postRouter.delete('/posts/:id', deletePost);


export default postRouter;

