const express = require('express');
const path = require('path');
const app = express();

const subContext = "";
const publicDir = "build";

if(subContext) {
    app.use(subContext, express.static(path.join(__dirname, publicDir)));
    app.use(subContext + "/static/css", express.static(path.resolve("./" + subContext + "/static/css")))
} else {
    app.use(express.static(path.join(__dirname, publicDir)));
}

app.get("/*", function(req, res){
    res.sendFile(path.join(__dirname, publicDir, "index.html"));
});

app.listen(3434, function(){
    console.log("App listening on port 3434")
});