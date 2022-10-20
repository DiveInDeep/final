import express from "express";

//factor out API
import { getItems, postAddItem, getItem, putEditItem, deleteItem,getRecords,uploadItemImage ,uploadFiles, getSearch, putEditStatus,newUpdateStatus} from "../controllers/itemController.js";
import verify from "../helpers/verify.js";

const router = express.Router();


// router.route("/").get(getItems).post(postAddItem);
router.get("/",getItems);
router.post("/", verify, uploadItemImage, postAddItem);

//router.post("/uploads/(:id)", uploadItemImage,  uploadFiles);
router.post("/search",getSearch);
//router.put("/status", verify, putEditStatus);
// router.post("/status", putEditStatus);
router.post("/status", newUpdateStatus);
//router.get("/add",getAddIdea);
// router.get("/edit/(:id)", getEditIdea);
router.get("/(:id)",getItem);
router.put("/edit/(:id)",putEditItem);


router.delete("/(:id)", deleteItem);
router.get("/records/all",getRecords);


export default router;
