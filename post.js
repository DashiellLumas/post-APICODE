require('dotenv').config();
const http = require("https");
const API_KEY = process.env.API_KEY;
const API_HOST = process.env.API_HOST;
const API_PATH = process.env.API_PATH;

import * as obj from './output.json';

function formatDate(obj){
  for(let i  = 0; i < obj.default.length; i++){
    if(obj[i].birthday && obj[i].birthday.endsWith(")")){
    let formattedDate = new Date(obj[i].birthday)
    let pushedDate = formattedDate.toISOString();
    obj[i].birthday = pushedDate;
  } else if(obj[i].birthday == ""){
    delete obj[i].birthday
  }
  }
}
formatDate(obj)

try{
  formatDate(obj)
  formatAPIObjects(obj);
}catch(error){
}

function formatAPIObjects(object){
  Object.keys(object).forEach( (arrayItem,index) => {
    // no null values allowed by API for these properties
    if(object.default[index].email.endsWith("m") && object.default[index].email != ""){
      // prepare API OBJ
     let API_OBJ = {
        "name": null,
        "emails": [
         {
           "type": "home",
           "email": null
         }
        ],
        "phones": [
         {
           "type": "home",
           "phone": null
         },
         {
           "type": "work",
           "phone": null
         }
       ],
        "birthdayAt":null
        }
  //Format for API

    API_OBJ.name = object.default[index].firstName + " " + object.default[index].lastName;
    API_OBJ.emails[0].email = object.default[index].email;
    let homePhone = object.default[index].homePhone.replace(/\./g, "-") || "000-000-0000";
    let workPhone = object.default[index].workPhone.replace(/\./g, "-") || "000-000-0000";
    API_OBJ.birthdayAt = object.default[index].birthday || "2016-12-24T18:45:36.000Z"
   API_OBJ.phones[0].phone = homePhone;
    API_OBJ.phones[1].phone = workPhone;
    let data = JSON.stringify(API_OBJ)

    console.log(data)
   // Post data object
   postObjectToAPI(data);
 }
})
}



function postObjectToAPI(data){
  let options = {
 "method": "POST",
 "hostname": API_HOST,
 "port": null,
 "path": API_PATH,
 "headers": {
   "authorization": `Bearer ${API_KEY}`,
   "content-type": "application/json"
 }
};

let req = http.request(options, (res) => {
 let chunks = [];

 res.on("data",  (chunk) => {
   chunks.push(chunk);
 });

 res.on("end",  () => {
   let body = Buffer.concat(chunks);
   console.log(body.toString());
 });
});

req.write(data);
req.end();

}
