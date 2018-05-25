import { Master } from "../models/master";
import { SelectItem } from "primeng/primeng";

export class Helpers {

    
 static convertLabelToMaster(source:Array<SelectItem>):Array<Master>{
    let dest:Array<Master>=new Array<Master>();
   
    source.forEach(element => {
      let temp:Master=new Master();
      temp.Id=element.value;
      temp.Name=element.label;
      dest.push(temp);
    });
    return dest;
  }
}
