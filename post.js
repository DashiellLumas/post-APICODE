require('dotenv').config();
const http = require("https");
const API_KEY = process.env.API_KEY;
const API_HOST = process.env.API_HOST;
const API_PATH = process.env.API_PATH;

import * as obj from './output.json';

try{
  formatAPIObjects(obj);
}catch(error){
}

function formatAPIObjects(object){
  Object.keys(object).forEach( (arrayItem,index) => {
    // no null values allowed by API for these properties
    if(object.default[index].email != "" && object.default[index].homePhone != "" && object.default[index].workPhone != "" ){

      // prepare API OBJ
     const API_OBJ = {
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
        ]
        }
  //Format for API
    API_OBJ.name = object.default[index].firstName + " " + object.default[index].lastName;
    API_OBJ.emails[0].email = object.default[index].email
    API_OBJ.phones[0].phone = object.default[index].homePhone.replace(/\./g, "-")
    API_OBJ.phones[1].phone = object.default[index].workPhone.replace(/\./g, "-")
    let data = JSON.stringify(API_OBJ)


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
