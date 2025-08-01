import express from "express";
import { Google, SignIn, SignUp } from "../controllers/auth.controller.js";

const router = express.Router();
// Route 
router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/google", Google);


export default router;
