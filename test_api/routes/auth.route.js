import { Router } from "express";
import { postdog } from "../../index.js";

const router = Router();

router.post("/register", (req, res) => {
  res.status(201).json({ success: true });
});

export default postdog(router, { name: "collections", prefix: "/auth" });
