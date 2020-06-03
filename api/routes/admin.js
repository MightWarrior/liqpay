const express = require("express");
const router = express.Router();
const jsonParser = express.json();

const AdminController = require("../controllers/admin");

router.get("/pay/:sum", jsonParser, AdminController.admin_pay);

router.post("/pay/p2p", jsonParser, AdminController.admin_p2p);

module.exports = router;
