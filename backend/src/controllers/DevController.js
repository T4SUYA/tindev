const axios = require('axios');
const Dev = require('../models/Dev');
module.exports = {
    async index(request, response) {
        const { user } = request.headers

        const loggedDev = await Dev.findById(user)

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev. likes } },
                { _id: { $nin: loggedDev. dislikes } }
            ]
        }).sort({_id: -1})

        return response.json(users)
    },
    async store(request, response) {
        
        let { username } = request.body
        username = JSON.parse(JSON.stringify(username).toLowerCase());
        const userExists = await Dev.findOne({ user: username })

        if (userExists) {
            console.log(`User ${username} already exists.`)
            return response.json(userExists);
        };
        try {
            githubResponse = await axios.get(`https://api.github.com/users/${username}`)
        } catch (err) {
            console.error("Error response:");
            console.error(err.response.data);  
            console.error(err.response.status);  
            console.error(err.response.headers);
            response.sendStatus(err.response.status);
        }

        const { name, bio, avatar_url: avatar } = githubResponse.data

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })
        
        console.log(`User ${username} created.`)
        return response.json(dev)
    }
}