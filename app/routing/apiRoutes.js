var friends = require("../data/friends.js");

module.exports = function(app){
    app.get("/api/friends", function(req,res){
        response.json(friends);
    });

    app.post("/api/friends",function(req,res){
        var totalDifference = 0;
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        var b = userScores.map(function(item){
            return parseInt(item, 10);
        });

        userData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: b
        };
        
        console.log("Name" + userName);
        console.log("user score" + userScores);

        var sum = b.reduce((a,b) => a + b,0);
        console.log ("sum of users scores" + sum);
        console.log ("best match friend diff." + bestMatch.friendDifference);

        for (var i = 0; i < friends.length; i++){
            console.log(friends[i].name);
            totalDifference = 0;
            console.log("total difference" + totalDifference);
            console.log("best match frined difference" + bestMatch.friendDifference);

            var bfriendScore = friends[i].score.reduce((a,b) => a + b,0);
            console.log ("total friend score" + bfriendScore);
            totalDifference += Math.abs(sum - bfriendScore);
            console.log("-------------toal difference-----------------" + totalDifference);

            if (totalDifference <= bestMatch.friendDifference){
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
            console.log(totalDifference + "total diff");
        }
        console.log(bestMatch);
        friends.push(userData);
        console.log("new user added");
        console.log(userData);
        res.json(bestMatch);

    });
}