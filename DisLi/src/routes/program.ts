import express from "express";
const router = express.Router();
import program_logic from "../logic/program_logic";
// import authorize_page from "../middleware/authorize_page";
// import { UserRole } from "../utils/UserRoles";

// router.get("/", authorize_page([UserRole.ADMIN]), program_logic.view_programs);

// router.post("/", authorize_page([UserRole.ADMIN]), program_logic.add_program);

// router.delete(
//   "/",
//   authorize_page([UserRole.ADMIN]),
//   program_logic.delete_program
// );

router.get("/", program_logic.view_programs);

router.post("/", program_logic.add_program);

router.delete("/", program_logic.delete_program);

export = router;
