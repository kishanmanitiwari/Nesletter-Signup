const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));




app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");

});

app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const emailId = req.body.email;

  const data = {
    members:[
      {
        email_address:emailId,
        status:"subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName

        }

      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/c75bc7f4f2"

  const options = {
    method:"POST",
    auth: "kishan:76d877509e6b5f8aa3a6895838976ee8-us10"
  }

const request = https.request(url,options,function(response){

  if (response.statusCode ==200) {
    res.sendFile(__dirname + "/sucess.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }



  response.on("data",function(data){
    console.log(JSON.parse(data));
  })


})

  request.write(jsonData);
  request.end();
  console.log(firstName,lastName,emailId);


});
app.post("/failure",function(req,res){
  res.redirect("/");
});

app.post("/success",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running");
});

//APi Key
// 76d877509e6b5f8aa3a6895838976ee8-us10

// Audience id
// c75bc7f4f2
