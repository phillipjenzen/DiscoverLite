import express from "express";
const router = express.Router();
// import authorize_page from "../middleware/authorize_page";
// import { UserRole } from "../utils/UserRoles";
import inventory_logic from "../logic/inventory_logic";

// router.get(
//   "/",
//   authorize_page([UserRole.ADMIN]),
//   inventory_logic.view_inventory
// );

// router.get("/:id", authorize_page([UserRole.ADMIN]), inventory_logic.view_item);

// router.post("/", authorize_page([UserRole.ADMIN]), inventory_logic.add_item);

// router.put("/", authorize_page([UserRole.ADMIN]), inventory_logic.modify_item);

router.get("/add", inventory_logic.add_item_page);

router.post("/add", inventory_logic.add_item);

router.get("/", inventory_logic.view_inventory);

router.get("/:id", inventory_logic.view_item);

router.put("/", inventory_logic.modify_item);

export = router;
