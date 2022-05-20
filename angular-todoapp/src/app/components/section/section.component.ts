import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/data-models/task';
import { faPlus, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ProjectsDataService } from 'src/app/services/projects-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @Input() id: number | undefined;
  addIcon = faPlus;
  deleteIcon = faTrashCan;
  editIcon = faPenToSquare;

  addTaskFormClass = {
    "hidden": true
  };
  addTaskClass = {
    "hidden": false
  }
  sectionHeaderContainerClass = {
    "section-header-container": true,
    "hidden": false
  }
  editSectionClass = {
    "edit-section": true,
    "hidden": true
  }
  sectionName = "";

  formGroup: FormGroup = this.fb.group({
    "sectionName": ["", Validators.required]
  })

  constructor(public data: ProjectsDataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  toggleVisibility() {
    // console.log("on add task click");
    this.addTaskClass.hidden = !this.addTaskClass.hidden;
    this.addTaskFormClass.hidden = !this.addTaskFormClass.hidden;
  }

  toggleEditVisibility() {
    this.sectionHeaderContainerClass.hidden = !this.sectionHeaderContainerClass.hidden;
    this.sectionHeaderContainerClass['section-header-container'] = !this.sectionHeaderContainerClass['section-header-container'];
    this.editSectionClass.hidden = !this.editSectionClass.hidden;
  }

  onAddTask(newTask: Task) {
    this.data.addTask(newTask);
  }

  onDeleteSection() {
    if (this.id === undefined) return;
    let dSection = this.data.getSection(this.id);
    if (!dSection) return;
    this.data.deleteSection(dSection);
  }

  onEditSection() {
    if (this.id == undefined) return;
    let section = this.data.getSection(this.id);
    if (!section) return;
    this.sectionName = section.name;
    this.toggleEditVisibility();
  }

  onEditSubmit() {
    if (this.id == undefined) return;
    let section = this.data.getSection(this.id);
    if (!section) return;
    section.name = this.sectionName;
    this.data.updateSection(section);
    this.toggleEditVisibility();
  }

  onSectionHeaderClick() {
    if (this.id == undefined) return;
    let section = this.data.getSection(this.id);
    if (!section) return;
    console.log("sel", this.data.selectedTasks);
    for (let i = 0; i < this.data.selectedTasks.length; i++) {
      let task = this.data.selectedTasks[i];
      task.sectionId = this.id;
      this.data.updateTask(task);
    }
    this.data.selectedTasks = [];
    console.log("selected", this.data.selectedTasks);
  }
}
