var express = require("express");
var app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
const request = require("request");
var serviceAccount = require("./serviceAccountKey.json");
const token = '5635843491:AAEpohKlqhG5-L9cSphnowM_H-rwBhQsnDY';

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
  credential: cert(serviceAccount),
});
const path = require("path");
const { futimes } = require("fs");
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "public")));

const db = getFirestore();

app.get('/',function(req,res){
res.sendFile(__dirname +"/welcome.html")
})
app.get('/login',function(req,res){
res.sendFile(__dirname +"/login.html")
})
app.get('/welcome',function(req,res){
res.sendFile(__dirname +"/welcome.html")
})
app.get('/signup',function(req,res){
res.sendFile(__dirname +"/signup.html")
})
app.get('/about1',function(req,res){
res.sendFile(__dirname +"/about.html")
})
app.get('/signup1',function(req,res){
res.sendFile(__dirname +"/signup.html")
})
app.get('/login1',function(req,res){
res.sendFile(__dirname +"/login.html")
})
app.get('/submit1',function(req,res){
res.sendFile(__dirname +"/login.html")
})
app.get('/homepage1',function(req,res){
res.sendFile(__dirname +"/homepage.html")
})
app.get('/signupSubmit',function(req,res){
db.collection('Trivia').add({
Name :req.query.name,
Username :req.query.username,
Password :req.query.password,
}).then(()=>{
    res.sendFile(__dirname +"/login.html")
  })
})

app.get('/loginSubmit',function(req,res){
var user = req.query.username
var pswd = req.query.password
db.collection('Trivia').get()
.then(function(docs){
var flag = 0;
docs.forEach((doc) => {
if(user == doc.data().Username && pswd == doc.data().Password){
flag = 1;
}
});
if (flag == 1){
res.sendFile(__dirname +"/homepage.html")
}
else{
  res.sendFile(__dirname +"/invalidlogin.html")
}
})
})

app.get('/homepage',function(req,res){
res.sendFile(__dirname +"/homepage.html")
})

app.get("/art", function (req, res) {
  request.get({
  url: 'https://api.api-ninjas.com/v1/trivia?category=artliterature',
  headers: {
    'X-Api-Key': 'VsGXB1aH2Aoxovg8Mrr+hw==gUG8twKtlquI7jXT'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else {
  const correct = JSON.parse(body)[0].answer
res.write(
          '<body style="background-image: url(questionbg4.jpg);margin-top:250px;" >'
        );
  res.write("<center>");
        res.write(
          "<h1 style = ' color : #154360 '>" +
            JSON.parse(body)[0].question +
            "</h1>"
        );
    res.write("<input id = 'ans' type='text' name = 'answer' placeholder='Enter Answer' required><br>");
//res.write("<button onclick='document.getElementById('ans').innerHTML= correct'> Submit </button>")
res.write("<script>");
    res.write("function validate(){var x = document.getElementById('ans').value;if (x =="+JSON.parse(body)[0].answer+
    "){<h1 style = ' color : #154360 '>Congratulations!!!You are Right!!</h1>}else{<h1 style = ' color : #154360 '>Oops!!You are wrong<br>Correct Answer : "
    +JSON.parse(body)[0].answer+"</h1>;}")
    res.write("</script>");
res.write("<button onclick = 'Validate()'> Submit </button>")
 
}
})
 })  
       
app.listen(3000,function(){
console.log("Listening")
})
