import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  @Input() dato:String;
  constructor() { }

  ngOnInit(): void {
  }

}
