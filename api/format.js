import * as csvOutput from '../data/output.json';
import {API_OBJ} from "./api_obj.js";
import {postObjectToAPI} from "./post.js";


function formatDate(csvOutput){
  for(let i  = 0; i < csvOutput.default.length; i++){
    if(csvOutput[i].birthday && csvOutput[i].birthday.endsWith(")")){
    let formattedDate = new Date(csvOutput[i].birthday)
    let pushedDate = formattedDate.toISOString();
    csvOutput[i].birthday = pushedDate;
  } else if(csvOutput[i].birthday == ""){
    delete csvOutput[i].birthday
  }
  }
}

function formatAPIObjects(object, API_OBJ){
  Object.keys(object).forEach( (arrayItem,index) => {
    if(object.default[index].email.endsWith("m") && object.default[index].email != ""){
    API_OBJ.name = object.default[index].firstName + " " + object.default[index].lastName;
    API_OBJ.emails[0].email = object.default[index].email;
    let homePhone = object.default[index].homePhone.replace(/\./g, "-") || "000-000-0000";
    let workPhone = object.default[index].workPhone.replace(/\./g, "-") || "000-000-0000";
    API_OBJ.birthdayAt = object.default[index].birthday;
    API_OBJ.phones[0].phone = homePhone;
    API_OBJ.phones[1].phone = workPhone;
    let data = JSON.stringify(API_OBJ)

    postObjectToAPI(data);
 }
})
}

module.exports = {
  formatAPIObjects: formatAPIObjects,
  formatDate: formatDate

}
