const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
    }
    
    
})


module.exports = router