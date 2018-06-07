import { Component, OnInit, Input } from '@angular/core';
import { TemplateControl } from '../../../models/template-control';

@Component({
  selector: 'app-control-generator',
  templateUrl: './control-generator.component.html',
  styleUrls: ['./control-generator.component.css']
})
export class ControlGeneratorComponent implements OnInit {
@Input()
control:TemplateControl;
  constructor() { }

  ngOnInit() {
  }

}
