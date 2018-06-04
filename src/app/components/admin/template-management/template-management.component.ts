import { Component, OnInit } from '@angular/core';
import { ValidationRule } from '../../../models/validation-rule';
import { TemplateSelectionRule } from '../../../models/template-selection-rule';
import { TemplateManagementService } from '../../../services/template-management.service';
import { TemplateControl } from '../../../models/template-control';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-template-management',
  templateUrl: './template-management.component.html',
  styleUrls: ['./template-management.component.css']
})
export class TemplateManagementComponent implements OnInit {
  templateSelectionRule: TemplateSelectionRule = new TemplateSelectionRule(this._userService.getBusinessUnit());
  templateControls:TemplateControl[];

  constructor(private _templateManagementService:TemplateManagementService,private _userService: UserService) { }

  ngOnInit() {
    
  }


  getTemplateControls(){
    //get template controls
    this._templateManagementService.getTemplateControls(this.templateSelectionRule).subscribe(data=>{
      this.templateControls=data;
    }
  );
  }
}
