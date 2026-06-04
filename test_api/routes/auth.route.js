import { Router } from "express";
import { Postdog } from "../../index.js";

const router = Router();

router.post("/register", (req, res) => {
  res.status(201).json({ success: true });
});

export default Postdog(router, { name: "collections", prefix: "/auth" });
