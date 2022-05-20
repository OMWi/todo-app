import { Component, Input, OnInit } from '@angular/core';
import { faPlus, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/data-models/project';
import { ProjectsDataService } from 'src/app/services/projects-data.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  createIcon = faPlus;
  deleteIcon = faTrashCan;
  editIcon = faPenToSquare;

  @Input() projects: Project[] = [];
  projectName = "";

  createProjectInputClass = {
    "hidden": true
  }
  createProjectClass = {
    "hidden": false
  }

  addProjectInputClass = {
    "hidden": true
  }
  projectContainerClass = {
    "hidden": false
  }

  constructor(public data: ProjectsDataService) { }

  ngOnInit(): void {
  }

  toggleVisibility() {
    this.createProjectInputClass.hidden = !this.createProjectInputClass.hidden;
    this.createProjectClass.hidden = !this.createProjectClass.hidden;
  }

  toggleEditVisibility() {
    this.addProjectInputClass.hidden = !this.addProjectInputClass.hidden;
    this.projectContainerClass.hidden = !this.projectContainerClass.hidden;
  }

  onSubmit() {
    let newProject = new Project(this.projectName);
    this.data.addProject(newProject);
    this.toggleVisibility();
  }

  selectProject(id: number) {
    this.data.selectedProjectId = id;
  }

  onDeleteProject(project: Project) {
    this.data.deleteProject(project);
  }

  onEditProject(project: Project) {
    this.projectName = project.name;
    this.toggleEditVisibility();
  }

  onEditSubmit(project: Project) {
    project.name = this.projectName;
    this.data.updateProject(project);
    this.toggleEditVisibility();
  }

}
