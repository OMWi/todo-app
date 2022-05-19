import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Project } from '../data-models/project';
import { Section } from '../data-models/section';
import { Task } from '../data-models/task';

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {
  projects: Project[] = [];
  selectedProjectId: number = -1;

  constructor(private fbService: FirebaseService) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    this.fbService.getProjects(uid).then(proejctsSnap => {
      let projects = proejctsSnap.val();
      for (let projectId in projects) {
        let newProject = new Project(projects[projectId].name);
        newProject.id = parseInt(projectId);
        this.fbService.getSections(uid!).then(sectionsSnap => {
          let sections = sectionsSnap.val();
          for (let sectionId in sections) {
            if (sections[sectionId].projectId != projectId) {
              continue;
            }
            let newSection = new Section(sections[sectionId].name);
            newSection.id = parseInt(sectionId);
            this.fbService.getTasks(uid!).then(tasksSnap => {
              let tasks = tasksSnap.val();
              for (let taskId in tasks) {
                if (tasks[taskId].sectionId != sectionId) {
                  continue;
                }
                let newTask = new Task(tasks[taskId].title, tasks[taskId].description,
                  tasks[taskId].priority, tasks[taskId].sectionId);
                newTask.id = parseInt(taskId);
                newSection.tasks.push(newTask);
              }
            })
            newProject.sections.push(newSection);
          }
        })
        this.projects.push(newProject);
      }
    })
  }

  addProject(project: Project) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    this.projects.push(project);
    this.fbService.addProject(uid, project);
    this.selectedProjectId = project.id;
  }
  getProject(projectId: number): Project {
    let uid = sessionStorage.getItem("uid");
    if (!uid) throw console.error("get project error. uid is null");
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === projectId) {
        return this.projects[i];
      }
    }
    throw console.error("no project with id " + projectId);
  }
  deleteProject(projectId: number) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    this.projects = this.projects.filter(function (value, index, arr) {
      return value.id !== projectId;
    });
    this.fbService.deleteProject(uid, projectId);
  }
  updateProject(project: Project) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    let oldProject = this.getProject(project.id);
    oldProject = project;
    this.fbService.updateProject(uid, project);
  }

  addSection(section: Section) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    this.projects[this.selectedProjectId].addSection(section);
    this.fbService.addSection(uid, section, this.selectedProjectId);
  }
  getSection(sectionId: number) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    for (let j = 0; j < this.projects.length; j++) {
      for (let i = 0; i < this.projects[j].sections.length; i++) {
        if (this.projects[j].sections[i].id === sectionId) {
          return this.projects[j].sections[i];
        }
      }
    }
    throw console.error("no section with id " + sectionId);
  }
  deleteSection(sectionId: number) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;

    for (let i = 0; i < this.projects.length; i++) {
      let sections = this.projects[i].sections;
      sections = sections.filter(function (value, index, arr) {
        return value.id !== sectionId;
      });
    }
    this.fbService.deleteSection(uid, sectionId);
  }
  updateSection(section: Section) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    let oldSection = this.getSection(section.id);
    oldSection = section;
    this.fbService.updateSection(uid, section, this.selectedProjectId);
  }

  addTask(task: Task) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    let section = this.getSection(task.sectionId);
    if (!section) {
      throw console.error("add task failed");
    }
    section.addTask(task);
    this.fbService.addTask(uid, task);
  }
  getTask(taskId: number) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    for (let j = 0; j < this.projects.length; j++) {
      for (let i = 0; i < this.projects[j].sections.length; i++) {
        for (let k = 0; k < this.projects[j].sections[i].tasks.length; k++) {
          if (this.projects[j].sections[i].tasks[k].id === taskId) {
            return this.projects[j].sections[i].tasks[k];
          }
        }
      }
    }
    throw console.error("no task with id " + taskId);
  }
  deleteTask(taskId: number) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    for (let i = 0; i < this.projects.length; i++) {
      let sections = this.projects[i].sections;
      for (let j = 0; j < sections.length; j++) {
        let tasks = sections[j].tasks;
        tasks = tasks.filter(function (value, index, array) {
          return value.id !== taskId;
        });
      }
    }
    this.fbService.deleteTask(uid, taskId);
  }
  updateTask(task: Task) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    let oldTask = this.getTask(task.id);
    oldTask = task;
    this.fbService.updateTask(uid, task);
  }
}
