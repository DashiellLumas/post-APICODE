require('dotenv').config();
const http = require("https");
const API_KEY = process.env.API_KEY;
const API_HOST = process.env.API_HOST;
const API_PATH = process.env.API_PATH;

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

module.exports = {
  postObjectToAPI: postObjectToAPI
}
