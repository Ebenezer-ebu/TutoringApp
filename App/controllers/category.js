var Category = require('../models/category');
var User = require ('../models/user');

module.exports = {
    create : async (req, res) =>{
        const { level, subjects, description } = req.body;
        const category = await User.create({
            level,
            subjects,
            description
        })

        return res.send(category)
    },
    find : async (req, res) => {
        const category = await Category.find()
        return res.send(category)
    },
    create : async (req, res) => {

        console.log(req.params);
        user = req.params;
        id = user.id;
        const { title, subtitle} = req.body;
        const post = await Post.create({
            title,
            subtitle,
            user:id
        });
        await post.save();

        const userById = await User.findById(id);

        userById.posts.push(post);
        await userById.save();

        return res.send(userById);
    },
}