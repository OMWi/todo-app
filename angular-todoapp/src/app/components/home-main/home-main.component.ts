import { Component, Input, OnInit } from '@angular/core';
import { Section } from 'src/app/data-models/section';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProjectsDataService } from 'src/app/services/projects-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {
  addIcon = faPlus;

  formGroup: FormGroup = this.fb.group({
    "sectionName": ["", Validators.required]
  })

  addSectionClass = {
    "hidden": false
  };
  addSectionFormClass = {
    "hidden": true
  };


  constructor(public data: ProjectsDataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.data.selectedProjectId == -1) return;
    let newSection = new Section(this.formGroup.value["sectionName"], this.data.selectedProjectId);
    this.data.addSection(newSection);
    this.toggleVisibility();
  }

  toggleVisibility() {
    this.addSectionClass.hidden = !this.addSectionClass.hidden;
    this.addSectionFormClass.hidden = !this.addSectionFormClass.hidden;
  }

  onAddSection() {
    if (this.data.selectedProjectId == -1) return;
    this.toggleVisibility();
  }

}
