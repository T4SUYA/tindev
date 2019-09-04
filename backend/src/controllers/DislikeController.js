const Dev = require('../models/Dev');

module.exports = {
    async store(req,res){
        const {DevId} = req.params;
        const {user} = req.headers;

        const LoggedDev = await Dev.findById(user);
        
        const TargetDev = await Dev.findById(DevId);

        if(!TargetDev) {
            res.status(400).json({ error: 'Dev not Exists' });
        }
        LoggedDev.dislikes.push(TargetDev._id);

        await LoggedDev.save();


        return res.json(LoggedDev);
    }
}