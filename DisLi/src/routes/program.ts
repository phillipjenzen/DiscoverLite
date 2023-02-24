import express from "express";
const router = express.Router();

// ADMIN
// view programs
router.get("/", async (req, res) => {
  req.params;
  res.status(200).send("get-program");
});

// ADMIN
// add programs
router.post("/", async (req, res) => {
    req.params;
    res.status(200).send("post-inventory");
  });

// ADMIN
// modify/depricate inventory
router.put("/", async (req, res) => {
    req.params;
    res.status(200).send("put-inventory");
  });


export = router;