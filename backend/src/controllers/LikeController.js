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
        LoggedDev.likes.push(TargetDev._id);
        const loggedSocket = req.connectedUsers[user];
        req.io.to(loggedSocket).emit('like', TargetDev.name);

        if(TargetDev.likes.includes(LoggedDev._id)){
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[DevId];
            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', TargetDev);
            }
            if(targetSocket){
                req.io.to(targetSocket).emit('match', LoggedDev);
            }
        }

        await LoggedDev.save();


        return res.json(LoggedDev);
    }
}