import { Router } from 'express';
const userRouter = Router();
import { registerUser, loginUser, getUserById, deleteUser, updateUser} from '../controllers/userController.js';

userRouter.post('/users/register', registerUser);
userRouter.post('/users/auth/login', loginUser);
userRouter.get('/users/profile/:id', getUserById);
userRouter.delete('/users/profile/:id', deleteUser);
userRouter.put('/users/profile/:id', updateUser);

export default userRouter;

