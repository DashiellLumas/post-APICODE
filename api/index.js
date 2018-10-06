import {formatDate, formatAPIObjects} from "./format.js";
import * as csvOutput from '../data/output.json';
import {API_OBJ} from "./api_obj.js";


  try{
    formatDate(csvOutput)
    formatAPIObjects(csvOutput,API_OBJ);
  }catch(error){
  }
