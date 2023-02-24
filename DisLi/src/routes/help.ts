import express from "express";
const router = express.Router();

// ADMIN
// view help request queue
router.get("/", async (req, res) => {
  req.params;
  res.status(200).send("get-help-all");
});

// ADMIN/TEACHER
// view your help requests
router.get("/user", async (req, res) => {
  req.params;
  res.status(200).send("get-help-mine");
});

// ADMIN// ADMIN
// delete inventory
router.delete("/", async (req, res) => {
  req.params;
  res.status(200).send("delete-help");
});
// view specific help request details
router.get("/:id", async (req, res) => {
  req.params;
  res.status(200).send("get-help-specific");
});


// ADMIN/TEACHER
// change resolved for specific application
router.put("/", async (req, res) => {
  req.params;
  res.status(200).send("put-help");
});

export = router;