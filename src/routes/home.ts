import express from "express";
import { checkAuth } from "../middlewares/auth";

const router = express.Router();

router.get("/", checkAuth, (_req, res) => {
  res.redirect("/api/productos");
});

export default router;
