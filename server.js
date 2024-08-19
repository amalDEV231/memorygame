 const trainee=require('./detailsModule');

// trainee.readSpecificDetails(1);

const http= require('http');
http.createServer(
    (req,res)=>{
        console.log(req.url);
        switch(req.url){
            case "/readDetails":
                trainee.readDetails(req,res);
                break;
            default:
                res.write("No routes found!");
                res.end();
                break;
        }
    }
).listen(5000,()=> console.log("Running in port: 5000"));