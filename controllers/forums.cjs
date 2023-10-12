const Forum = require('../models/forums.cjs')
const User = require('../models/user.cjs')
const Post = require('../models/post.cjs')
const Comment = require('../models/comment.cjs')

exports.showAllForums = async (req, res) => {
    try {

        const forumList = await Forum.find({})

        res.json(forumList)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.createNewForum = async (req, res) => {
    try {
        //check if forum topic already exists: if it does no new forum else create forum
       // console.log('*****************REQUEST*****************', req.user._id)

        const foundingUser = await User.findOne({ _id: req.user._id })
        const forumCheck = await Forum.findOne({ topic: req.body.topic })
       // console.log('forum check: ', forumCheck)
        if (!foundingUser) {
            res.json('please login or create an account to create a Quarry')
        }
        else if (forumCheck) {
            res.json({
                message: 'Quarry already exists!',
                Quarry: forumCheck
            })
        }
        else {
            //console.log(req.user)
            const newForum = await Forum.create(req.body)
            newForum.founder = foundingUser
            newForum.members.addToSet(foundingUser)
            newForum.numOfMembers++
            await newForum.save()

            await User.updateOne({ _id: req.user._id, $push: { foundedForums: newForum } })
            await User.updateOne({ _id: req.user._id, $push: { followedForums: newForum } })
            res.json({ newForum })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateForum = async (req, res) => {
    try {
        const foundForum = await Forum.findOne({ _id: req.params.id }).populate('founder')
        const checkUser = await User.findOne({ _id: req.user._id })
        //console.log('checkUser', checkUser)
        //console.log('foundForum founder', foundForum.founder)
        if (checkUser.email === foundForum.founder.email) {
            const updatedForum = await Forum.findOneAndUpdate({ _id: foundForum._id }, req.body, { new: true })
            res.json(updatedForum)
        } else {
            res.json('You Are Not Authorized to Edit this Quarry')
        }


    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showAforum = async (req, res) => {
    try {
        const forum = await Forum.findOne({ '_id': req.params.id }).populate('posts')
        res.json(forum)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteAForum = async (req, res) => {
    try {
        const foundForum = await Forum.findOne({ _id: req.params.id }).populate('founder')
        const checkUser = await User.findOne({ _id: req.user._id })
        if (checkUser.email === foundForum.founder.email) {
            await User.updateOne({ _id:req.user._id, $pull: { foundedForums: foundForum._id} })
            await User.updateMany({ $pull: { followedForums: foundForum._id} })
            await Forum.findOneAndDelete({ _id: foundForum._id })
            res.json('Quarry Destoryed')
        } else {
            res.json('You Are Not Authorized to Destory this Quarry')
        }


    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}



exports.addAMember = async (req, res) => {
    try {
        if (!req.user) {
            res.json('please login to continue')   
        } else {
            const newMember = await User.findOne({_id:req.user._id})
            const newFollowedForum = await Forum.findOne({_id:req.params.id})
            const isMember = await Forum.exists({_id:req.params.id, members:req.user._id})
            console.log('isMember?', isMember)
            if(isMember){
                res.json('Already a Member')
            }else{

                await User.findOneAndUpdate({ _id: newMember._id}, {$addToSet: { followedForums: newFollowedForum }}, {new:true})
                await Forum.updateOne({_id:req.params.id, 
                    $addToSet:{members:newMember},
                    $inc:{numOfMembers:1}
                })
                
                res.json(newFollowedForum)
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}
exports.removeAMember = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}




/*

//post routes

router.delete('/:id', userController.auth, forumController.deleteAPost) id of the post
router.put('/:id', userController.auth, forumController.updateAPost)
router.get('/:id', userController.auth, forumController.showAPost)

//comment routes

router.post('/:id', userController.auth, forumController.addComment)
router.delete('/:id', userController.auth, forumController.deleteComment)
router.put('/:id', userController.auth, forumController.editComment)
router.get('/:id', userController.auth, forumController.showAComment)

*/