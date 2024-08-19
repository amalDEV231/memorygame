const fs=require('fs');

function addDetails(data) {
    let details = fs.readFileSync("./details.json", "utf8");
    details = JSON.parse(details);
    details.push(data);
    fs.writeFileSync("./details.json", JSON.stringify(details));
}

function readDetails(req,res) {
    try{
        res.write(fs.readFileSync("./details.json", "utf8"));
        res.end();
    }
    catch(err){
        console.log({"data":"","msg":"","err":err.message});
    }
}

function readSpecificDetails(id) {
    try{
        let data = readDetails();
        let resultData = JSON.parse(data).filter(v => v.id === id);
        if (Object.keys(resultData).length !== 0) {
            console.log({"data":resultData,"msg":"Read success","err":""});
        } else {
            console.log({"data":resultData,"msg":"","err":"read failed"});
        }
    }
    catch(err){
        console.log({"data":"","msg":"","err":err.message});
    }
    
}


function updateDetails(id, Updates) {
    try{
        let arr = JSON.parse(readDetails());
        let t = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
                arr[i] = { ...arr[i], ...Updates };
                fs.writeFileSync("./details.json", JSON.stringify(arr));
                t = 1;
                break;
            }
        }
        if (t) {
            console.log({"data":readDetails(),"msg":"Updated succesfully","err":""});
        } else {
            console.log({"data":"","msg":"","err":"Update Failed"});
        }
    }
    catch(err){
        console.log({"data":"","msg":"","err":err.message});
    }
    
}

function deleteDetails(id) {
    try{
        let data = readDetails();
        let resultData = JSON.parse(data).filter(v => v.id !== id);
        if (Object.keys(resultData).length !== 0) {
            fs.writeFileSync("./details.json", JSON.stringify(resultData));
            console.log({"data":readDetails(),"msg":"delete success","err":""});
        } else {
            console.log({"data":"","msg":"","err":"delete failed"});
        }
    }
    catch(err){
        console.log({"data":"","msg":"","err":err.message});
    }
    
}
module.exports={
    addDetails,
    readDetails,
    readSpecificDetails,
    updateDetails,
    deleteDetails,
}