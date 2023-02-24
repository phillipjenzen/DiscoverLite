import express from "express";
const router = express.Router();
import { Application } from "../entity/application";
import { ApplicationStatus } from "../entity/application";

// ADMIN
// view all applications
router.get("/", async (req, res) => {
    const all_apps = await Application.findBy({ status: ApplicationStatus.PENDING });
    all_apps.find;
  req.params;
  res.status(200).send("get-application-all");
});

// ADMIN
// view specific application details
router.get("/:id", async (req, res) => {
    req.params;
    res.status(200).send("get-application-specific");
  });
  

// ADMIN
// accept/decline specific application
router.put("/", async (req, res) => {
  req.params;
  res.status(200).send("put-application");
});

export = router;