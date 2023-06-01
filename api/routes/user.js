const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body
                },
                {
                    new: true,
                }
            )
            res.status(200).json(updateUser)
        } 
        catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(401).json("You can update your account ")
    }
    
})

// Delete a User
router.delete("/:id", async (req, res) => {
    if(req.params.userId === req.params.id){
        // delete all post of  user and user account
        

        try{
            const user = await User.findById(req.params.id)

            try {
                await Post.deleteMany({username:user.username})
            } catch (error) {

                
            }


        }catch(error){

        }
    }
})


module.exports = router