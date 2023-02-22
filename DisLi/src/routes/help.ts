import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  req.params;
  res.status(200).send("Hi");
});

router.post("/", async (req, res) => {
  req.params;
  res.status(200).send("Hi");
});

export = router;
