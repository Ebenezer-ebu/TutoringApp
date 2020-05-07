var User = require ('../models/user');

module.exports = {
    create : async (req, res) =>{
        const { title, name, bio } = req.body;
        const user = await User.create({
            title,
            name,
            bio
        })

        return res.send(user)
    },

    find : async (req, res) => {
        const user = await User.find()
        return res.send(user)
    },
    categoryByUser : async (req, res) => {
       const { id } = req.params;
       const user = await User.findById(id).populate('category');

        res.send(user.category);
    }

}
