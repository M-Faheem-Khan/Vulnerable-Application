const express = require("express");
const app = express(); // init. express
const port = 4000;


// Use public folder
app.use(express.static('public'));


// Routes
app.get("/", (req, res) => {
    res.send("Welcome to the AI ever!! - You can GET what ever you want! (sometimes not all the times, AI still in training)")
});


// sendFile - Sanitize the input [Don't use in prod]
app.get("/fetch", (req, res) => {
    var file = req.query.file;
    var nono_files = ["server.js", "package-lock.json"];

    if (!file || file === "") {
        res.send("Cannot Return what I don't have!!\nUsage: /fetch/?file=");
    } else {
        if (nono_files.includes(file)) {
            res.send("Haha very funny I cannot give you that file!");
        } else {
            res.sendFile(__dirname + "/" + file); // Why would you use this here!!
        }
    }
});


// Eval - Never use this!
app.get("/query", (req, res) => {
    var q = req.query.query;
    var nono_startswith = ["rm", "del", "powershell", "python", "node"];

    if (!q || q === "") {
        res.send("Cannot Return what I don't have!!\nUsage: /query/?query=");
    } else {
        var flag = true;

        for (var n in nono_startswith) {
            if (q.startsWith(nono_startswith[n])){
                flag = false;
            }
        }
        
        console.log(q)
        console.log(flag)
        if (flag) {
            var result = eval(q); // Why would you use this here!!
            res.send(result.toString()); 
        } else {
            res.send("Haha very funny I cannot give you that file!");
        }
    }
});


// Start Server
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})

// EOF 