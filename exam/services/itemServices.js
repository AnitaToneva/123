const Post = require("../models/Ad");
const User = require("../models/User");

async function getById(id) {
    return Post.findById(id).populate('author').populate('applied').lean()
}



async function getAllByDate() {
    return await Post.find({}).sort({_id:1}).limit(3).lean()
}

//Create
async function createItem(item) {
    const result = new Post(item)
    await result.save();

    const user = await User.findById(result.author)
    user.myAds.push(result._id)
    await user.save()

}

async function getAll() {
    return await Post.find({}).populate('author').lean()
}



//Edit
async function updateById(id, item) {
    const existing = await Post.findById(id);

    existing.headline = item.headline
    existing.location = item.location
    existing.nameCom = item.nameCom
    existing.descriptionComp = item.descriptionComp,
   

    await existing.save()

}


//Delete
async function deleteById(id) {
    await Post.findByIdAndDelete(id)
}

//Join
async function apply(itemId, userId) {

    const post = await Post.findById(itemId)
    if (post.applied.includes(userId)) {
        throw new Error('Consumers are already applying')
    }
    post.applied.push(userId)
    await post.save()
}





module.exports = {
    createItem,
    getById,
    getAll,
    updateById,
    deleteById,
    apply,
    getAllByDate,
    
};
    
   
   



