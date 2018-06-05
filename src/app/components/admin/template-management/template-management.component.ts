import { Component, OnInit } from '@angular/core';
import { ValidationRule } from '../../../models/validation-rule';
import { TemplateSelectionRule } from '../../../models/template-selection-rule';
import { TemplateManagementService } from '../../../services/template-management.service';
import { TemplateControl } from '../../../models/template-control';
import { UserService } from '../../../services/user.service';
import { ConfirmationService } from 'primeng/primeng';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-template-management',
  templateUrl: './template-management.component.html',
  styleUrls: ['./template-management.component.css']
})
export class TemplateManagementComponent implements OnInit {
  templateSelectionRule: TemplateSelectionRule = new TemplateSelectionRule(this._userService.getBusinessUnit());
  templateControls:TemplateControl[]=[];

  constructor(private _templateManagementService:TemplateManagementService, private toastr: ToastrService,private _userService: UserService,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    
  }


  getTemplateControls(){
    //get template controls
    this._templateManagementService.getTemplateControls(this.templateSelectionRule).subscribe(data=>{
      this.templateControls=data;
    }
  );
  }
  updateTemplate(){
    this.confirmationService.confirm({
      header: 'Update Template',
      message: `Are you sur to want to update selected Template ?`,
      accept: () => {
        this._templateManagementService.updateTemplate(this.templateControls).subscribe(data => {
          if(data){
            this.templateControls=[];
          this.toastr.success("Template updated successfully !");
          }
        });
      }
    });
  }
  addNewTemplate(){
    this.confirmationService.confirm({
      header: 'New Template',
      message: `Are you sur to want to add a new template for this selection ?`,
      accept: () => {
        this._templateManagementService.addNewTemplate(this.templateSelectionRule).subscribe(data => {
          this.templateControls=data;
          this.toastr.success("New Template Created successfully !");
        });
      }
    });
  }
}
