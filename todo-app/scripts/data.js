import { Project } from "./project.js";
import { Section } from "./section.js";
import { Task } from "./task.js";

export class Data {
    constructor() {
        this.projects = [];
    }

    fillData() {
        for (let projectId = 0; projectId < 2; projectId++) {
            let newProject = new Project(projectId, "Project " + projectId);
            for (let sectionId = 0; sectionId < 2; sectionId++) {
                let newSection = new Section(projectId*2 + sectionId, "Section " + sectionId);
                for (let taskId = 0; taskId < 2; taskId++) {
                    let newTask = new Task(projectId*4 + sectionId*2 + taskId, "Task " + taskId, "task description", 1);
                    newSection.addTask(newTask);
                }
                newProject.addSection(newSection);
            }
            this.addProject(newProject);           
        }
    }

    addProject(project) {
        this.projects.push(project);
    }

    deleteProject(projectId) {
        this.projects = this.projects.fill(function(value, index, arr) {
            return value.id !== projectId;
        });
    }

    getProject(projectId) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].id === projectId) {
                return this.projects[i];
            }
        }
    }    
}