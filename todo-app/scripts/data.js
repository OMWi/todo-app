import { Project } from "./project.js";
import { Section } from "./section.js";
import { Task } from "./task.js";

export class Data {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.lastSearchString = "";
        this.selectedProjectID = -1;
    }

    fillData() {
        for (let projectId = 0; projectId < 2; projectId++) {
            let newProject = new Project("Project " + projectId);
            for (let sectionId = 0; sectionId < 1; sectionId++) {
                let newSection = new Section("Section " + ((projectId*2) + sectionId));
                for (let taskId = 0; taskId < 2; taskId++) {
                    let newTask = new Task("Task " + (projectId*4 + sectionId*2 + taskId), "task description", taskId + 1);
                    newSection.addTask(newTask);
                }
                newProject.addSection(newSection);
            }
            this.addProject(newProject);           
        }
        this.updateFilteredProjects();
    }

    updateFilteredProjects() {
        this.filteredProjects = this.projects.filter(project => project.name.search(new RegExp(this.lastSearchString, 'i')) > -1);
    }

    search(searchString) {
        this.lastSearchString = searchString;
        this.filteredProjects = this.projects.filter(project => project.name.search(new RegExp(searchString, 'i')) > -1);
    }

    addProject(project) {
        this.projects.push(project);
        this.updateFilteredProjects();
    }

    deleteProject(projectId) {
        this.projects = this.projects.fill(function(value, index, arr) {
            return value.id != projectId;
        });
        this.updateFilteredProjects();
    }

    getProject(projectId) {
        for (let i = 0; i < this.filteredProjects.length; i++) {
            if (this.filteredProjects[i].id == projectId) {
                return this.filteredProjects[i];
            }
        }
    }    
}