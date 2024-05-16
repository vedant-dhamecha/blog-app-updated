import express from "express";
const router = express.Router();
import {
    createPost,
    deletePost,
    getAllPosts,
    getAllPostsForUser,
    getPost,
    updatePost,
  } from "../conrollers/postControllers.js";
import { authGuard, adminGuard, memberGuard } from "../middleware/authMiddleware";

router
  .route("/:slug")
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost);

router.route("/").post(authGuard, createPost).get(getAllPosts);
router.route("/member/:user").post(authGuard, memberGuard, createPost).get(getAllPostsForUser);

export default router;