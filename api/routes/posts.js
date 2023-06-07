const router = require("express").Router();
const Post = require("../models/post")  


// Create a Post
router.post("/", async (req,res) => {
    const newPost = new Post(req.body)

    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update a Post
router.put("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        
        if( post.username === req.body.username){
            
            try {               
                const updatePost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:req.body,
                    },
                    {
                        new:true,
                    }
                )
                res.status(200).json(updatePost)
                
            } catch (error) {
                res.status(200).json(error)
                
            }
        }else {
            res.status(401).json("You can update only your post!")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete a post
router.delete("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
       
        if(post.username === req.body.username){
         
            try {  
                await post.delete()
                res.status(200).json("Post has been deleted!")   
            } catch (error) {
                res.status(500).json(error)  
            }
        }else{
            res.status(401).json("You can delete only your post!") 
        }     
    } catch (error) {   
        res.status(500).json(error)
        
    }
    
})  

module.exports = router