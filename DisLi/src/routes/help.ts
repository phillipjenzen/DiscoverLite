import express from "express";
// import authorize_page from "../middleware/authorize_page";
// import { UserRole } from "../utils/UserRoles";
import help_logic from "../logic/help_logic";
const router = express.Router();

// router.get("/", authorize_page([UserRole.ADMIN]), help_logic.view_help_queue);

// // ADMIN/(TEACHER IF AUTHORIZED)
// router.get(
//   "/:id",
//   authorize_page([UserRole.ADMIN, UserRole.FACULTY]),
//   help_logic.view_help_request
// );

// router.get(
//   "/user",
//   authorize_page([UserRole.ADMIN, UserRole.FACULTY]),
//   help_logic.view_help_request_authored
// );

// router.post(
//   "/",
//   authorize_page([UserRole.ADMIN, UserRole.FACULTY]),
//   help_logic.request_help
// );

// router.put(
//   "/",
//   authorize_page([UserRole.ADMIN, UserRole.FACULTY]),
//   help_logic.close_help_request
// );

router.get("/", help_logic.view_help_queue);

// ADMIN/(TEACHER IF AUTHORIZED)
router.get("/:id", help_logic.view_help_request);

router.get("/user", help_logic.view_help_request_authored);

router.post("/", help_logic.request_help);

router.put("/", help_logic.close_help_request);

export = router;
