const Dev = require('../models/Dev');

module.exports = {
    async UserData(req,res){
        const {user} = req.headers;
        const LoggedDev = await Dev.findById(user);

        return res.json(LoggedDev);
     }
};