import { sendNotFound, sendServerError, sendCreated, sendDeleteSuccess, paginate, orderData, checkIfValuesIsEmptyNullUndefined } from '../helper/helperFunctions.js';
import { getPostsService, deletePostService, getPostByIdService, addPostService, updatePostService, completePostService } from '../services/postServices.js';
import { postValidator } from '../validators/postValidator.js';
import { getUserByIdService } from '../services/userService.js';
import e from 'express';

export const getPosts = async (req, res) => { //localhost:3000/posts?page=1&limit=10    
    try {
        const data = await getPostsService();
        if (data.length === 0) {
            sendNotFound(res, 'No posts found');
        } else {
            if (!req.query.page && !req.query.limit) {
                if (req.query.order) {
                    res.status(200).json(orderData(data, req.query.order));
                } else {
                    res.status(200).json(data);
                }
            } else {
                if (req.query.order) {
                    paginate(orderData(data, req.query.order), req, res);
                } else {
                    paginate(data, req, res);
                }
            }
        }
    } catch (error) {
        sendServerError(res, error);
    }
}

export const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await getPostByIdService(id);
        if (post.length === 0) {
            sendNotFound(res, 'Post not found');
        } else {
            res.status(200).json(post);
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
}

export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const postToDelete = await getPostByIdService(id)
        if (postToDelete.length === 0) {
            sendNotFound(res, 'Post not found');
        } else {
            const response = await deletePostService(id);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendDeleteSuccess(res, `Post with id: ${id} was deleted successfully`);
            }
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
}

export const createPost = async (req, res) => {
    const { post_title, post_content, author_id } = req.body;
    const { error } = postValidator(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        try {
            let authorIdNumber = Number(author_id);
            const newPost = {
                post_title: post_title,
                post_content: post_content,
                author_id: authorIdNumber
            }
            let response = await addPostService(newPost);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                res.status(201).json(newPost);
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
}

export const updatePost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const searchPost = await getPostByIdService(id);
        if (searchPost.length === 0) {
            sendNotFound(res, 'Post not found');
        } else {
            let post = {};
            const { post_title, post_content, author_id } = req.body;
            //check author_id exists
            if (author_id !== undefined) {

            }
            if (post_title !== undefined) {
                post.post_title = post_title;
            } else {
                post.post_title = searchPost[0].post_title;
            }
            if (post_content !== undefined) {
                post.post_content = post_content;
            } else {
                post.post_content = searchPost[0].post_content;
            }
            if (author_id !== undefined) {
                const authorExists = await getUserByIdService(author_id);
                if (authorExists.length === 0) {
                    return res.status(404).send('Author not found');
                } else {
                    post.author_id = author_id;
                }
            } else {
                post.author_id = searchPost[0].author_id;
            }
            const response = await updatePostService(id, post);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, 'Post updated successfully');
            }
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
}


