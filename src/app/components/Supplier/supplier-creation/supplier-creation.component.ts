import { Component, OnInit } from '@angular/core';
import { SelectionCriteria } from '../../../models/selection-criteria';
import { UserService } from '../../../services/user.service';
import { TemplateSelectionRule } from '../../../models/template-selection-rule';
import { TemplateControl } from '../../../models/template-control';
import { TemplateManagementService } from '../../../services/template-management.service';

@Component({
  selector: 'app-supplier-creation',
  templateUrl: './supplier-creation.component.html',
  styleUrls: ['./supplier-creation.component.css']
})
export class SupplierCreationComponent implements OnInit {
  selectionCriteria:SelectionCriteria= new SelectionCriteria(this._userService.getBusinessUnit(),1,1);
  templateControls:TemplateControl[]=[];
  constructor(private _templateManagementService:TemplateManagementService,private _userService: UserService) { }

  ngOnInit() {
   
  }

  onValidationRuleSelectionChange(){
  }

  getTemplateControls(){
  //get template controls
  this._templateManagementService.getTemplateControls(this.selectionCriteria).subscribe(data=>{
    this.templateControls=data;
  }
);
  }
}
