const express = require("express")
const router = express.Router();
const UserCode = require('../models/UserCode')
const fetchuser = require('../middleware/Fetchuser')

// save users code
router.post('/save-code', fetchuser, async (req, res) => {
    const { html,css,js} = req.body
    const userId = req.user.id;

    try {
        let userCode = await UserCode.findOne({ userId});
        if (userCode) {
            userCode.html = html;
            userCode.css = css;
            userCode.js = js;
        }
        else {
            userCode = new UserCode({userId,html,css,js});
        }
        await userCode.save();
        res.status(200).json({message:"Code saved successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

// retrieve user code
router.get('/:language',fetchuser,async(req,res)=>{
    const userId = req.user.id;
    const language = req.params.language;

    try {
        const userCode = await UserCode.findOne({userId,language});
        if(!userCode){
            return res.status(404).json({message:"Code not found"});
        }
        res.status(200).json(userCode);
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

module.exports = router;