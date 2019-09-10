const axios = require('axios');
const Dev = require('../models/Dev');
module.exports = {
    async index(req,res){
        const {user} = req.headers;

        const LoggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user }},
                { _id: { $nin: LoggedDev.likes}},
                { _id: { $nin: LoggedDev.dislikes}},
            ]
        });
        return res.json(users);
    },
    async store(req,res) {
        const { username } = req.body;
        const UserExists = await Dev.findOne({user : username});
        if (UserExists){
            return  res.json(UserExists);
        }
        try {
            const response = await axios.get(
                `https://api.github.com/users/${username}`);
                
        } catch (err) {
            console.error("Error response:");
            console.error(err.response.data);  
            console.error(err.response.status);  
            console.error(err.response.headers);
            res.sendStatus(err.response.status);
        }
            const {name, bio,avatar_url:avatar} = response.data;
        const dev = await Dev.create({
                name,
                user: username,
                bio,
                avatar
    })       
          return res.json(dev); 
    }
};
