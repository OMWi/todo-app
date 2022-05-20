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
  sections: Section[] = [];
  tasks: Task[] = [];
  selectedTasks: Task[] = [];
  selectedProjectId: number = -1;

  constructor(private fbService: FirebaseService) { 
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    this.fbService.getProjects(uid)
      .then(snap => {
        let projects = snap.val();
        for (let id in projects) {
          let newProject = new Project(projects[id].name);
          newProject.setId(parseInt(id));
          this.projects.push(newProject);
        }
      })
      .finally(() => {
        if (this.projects.length > 0) {
          this.selectedProjectId = this.projects[0].id; 
          console.log("projects", JSON.stringify(this.projects));
        }
      });
    this.fbService.getSections(uid)
      .then(snap => {
        let sections = snap.val();
        for (let id in sections) {
          let newSection = new Section(sections[id].name, sections[id].projectID);
          newSection.setId(parseInt(id));
          this.sections.push(newSection);
        }
      })
      .finally(() => {
        console.log("sections", JSON.stringify(this.sections));
      });
    this.fbService.getTasks(uid)
      .then(snap => {
        let tasks = snap.val();
        for (let id in tasks) {
          let newTask = new Task(tasks[id].title, tasks[id].description, tasks[id].priority, tasks[id].sectionID);
          newTask.setId(parseInt(id));
          this.tasks.push(newTask);
        }
      })
      .finally(() => {
        console.log("tasks", JSON.stringify(this.tasks))
      });


    // this.fbService.getProjects(uid)
    //   .then(proejctsSnap => {
    //     // console.log("proj then");
    //     let projects = proejctsSnap.val();
    //     for (let projectId in projects) {
    //       let newProject = new Project(projects[projectId].name);
    //       newProject.id = parseInt(projectId);
    //       this.projects.push(newProject);
    //     }
    //     // console.log("proj then end");
    //   })
    //   .finally(() => {
    //     this.fbService.getSections(uid!)
    //       .then(sectionsSnap => {
    //         // console.log("sect then");
    //         let sections = sectionsSnap.val();
    //         // console.log("proj len", this.projects.length);
    //         // console.log("sect len", sections.length);
    //         for (let sectionId in sections) {
    //           // console.log(sections[sectionId]);
    //           let projectIdx = 0;
    //           for (let i = 0; i < this.projects.length; i++) {
    //             if (sections[sectionId].projectID === this.projects[i].id) {
    //               // console.log(sections[sectionId].projectID, " != ", this.projects[i].id);
    //               projectIdx = i;
    //               // console.log("sect id", sectionId, "found project");
    //               break;
    //             }
    //           }
    //           let newSection = new Section(sections[sectionId].name);
    //           newSection.id = parseInt(sectionId);

    //           // console.log("sect push: to proj id", this.projects[projectIdx].id, ";section db proj id", sections[sectionId].projectID);
    //           this.projects[projectIdx].sections.push(newSection);
    //         }
    //         // console.log("sect then end");
    //       })
    //       .finally(() => {
    //         this.fbService.getTasks(uid!)
    //           .then(tasksSnap => {
    //             // console.log("task then");
    //             let tasks = tasksSnap.val();
    //             for (let taskId in tasks) {
    //               let sectionIdx = 0;
    //               let projectIdx = 0;
    //               for (let i = 0; i < this.projects.length; i++) {
    //                 let project = this.projects[i];
    //                 for (let j = 0; j < project.sections.length; j++) {
    //                   let section = project.sections[j];
    //                   if (section.id === tasks[taskId].sectionID) {
    //                     projectIdx = i;
    //                     sectionIdx = j;
    //                     console.log("section found");
    //                     break;
    //                   }
    //                 }
    //               }
    //               let newTask = new Task(tasks[taskId].title, tasks[taskId].description,
    //                 tasks[taskId].priority, tasks[taskId].sectionID);
    //               newTask.id = parseInt(taskId);
    //               this.projects[projectIdx].sections[sectionIdx].tasks.push(newTask);
    //             }



    //             for (let i = 0; i < this.projects.length; i++) {
    //               for (let j = 0; j < this.projects[i].sections.length; j++) {

    //               }
    //             }
    //           })
    //           .finally(() => {
    //             if (this.projects.length > 0) {
    //               this.selectedProjectId = this.projects[0].id;
    //             }
    //             console.log(JSON.stringify(this.projects[0]));
    //           })
    //       })
    //   })
  }

  unselectTask(task: Task) {
    this.selectedTasks = this.selectedTasks.filter((val) => {
      return val.id != task.id;
    })
  }

  getProjects() {
    return this.projects;
  }
  getSections(projectId: number) {
    let res = this.sections.filter((val) => {
      return val.projectId == projectId;
    });
    // console.log(res.length);
    // console.log("req for ", projectId, "res: ", JSON.stringify(res));
    return res;

    // // console.log("get sections proj id", projectId, "proj len", this.projects.length);
    // let sections: Section[] = [];
    // for (let i = 0; i < this.projects.length; i++) {
    //   let project = this.projects[i];
    //   if (project.id === projectId) {
    //     // console.log("sections:", project.sections.length);
    //     return project.sections;
    //   }
    // }
    // // console.log("sections not found");
    // return sections;
  }
  getTasks(sectionId: number) {
    return this.tasks.filter((val) => {
      return val.sectionId == sectionId;
    })
    // let tasks: Task[] = [];
    // for (let i = 0; i < this.projects.length; i++) {
    //   let project = this.projects[i];
    //   for (let j = 0; j < this.projects.length; j++) {
    //     let section = project.sections[j];
    //     if (sectionId === section.id) {
    //       console.log("gettasks: ", section.tasks.length);
    //       return section.tasks;
    //     }
    //   }
    // }
    // return tasks;
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
  deleteProject(project: Project) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    this.projects = this.projects.filter((value) => {
      return value.id != project.id;
    });
    console.log("project len after del", this.projects.length);
    if (project.id == this.selectedProjectId) {
      if (this.projects.length > 0) {
        this.selectedProjectId = this.projects[0].id;
      }
      else {
        this.selectedProjectId = -1;
      }
    }
    this.fbService.deleteProject(uid, project);
  }
  updateProject(project: Project) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    let oldProject = this.getProject(project.id);
    oldProject.name = project.name;
    this.fbService.updateProject(uid, project);
  }

  addSection(section: Section) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    this.sections.push(section);
    // this.projects[this.selectedProjectId].addSection(section);
    this.fbService.addSection(uid, section, this.selectedProjectId);
  }
  getSection(sectionId: number) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    for (let i = 0; i < this.sections.length; i++) {
      if (this.sections[i].id === sectionId) {
        return this.sections[i];
      }
    }
    // for (let j = 0; j < this.projects.length; j++) {
    //   for (let i = 0; i < this.projects[j].sections.length; i++) {
    //     if (this.projects[j].sections[i].id === sectionId) {
    //       return this.projects[j].sections[i];
    //     }
    //   }
    // }
    throw console.error("no section with id " + sectionId);
  }
  deleteSection(section: Section) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    this.sections = this.sections.filter((value) => {
      return value.id !== section.id;
    });

    // for (let i = 0; i < this.projects.length; i++) {
    //   let sections = this.projects[i].sections;
    //   sections = sections.filter(function (value, index, arr) {
    //     return value.id !== section.id;
    //   });
    // }
    this.fbService.deleteSection(uid, section);
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
    this.tasks.push(task);
    // let section = this.getSection(task.sectionId);
    // if (!section) {
    //   throw console.error("add task failed");
    // }
    // section.addTask(task);
    this.fbService.addTask(uid, task);
  }
  getTask(taskId: number) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == taskId) {
        return this.tasks[i];
      }
    }
    // for (let j = 0; j < this.projects.length; j++) {
    //   for (let i = 0; i < this.projects[j].sections.length; i++) {
    //     for (let k = 0; k < this.projects[j].sections[i].tasks.length; k++) {
    //       if (this.projects[j].sections[i].tasks[k].id === taskId) {
    //         return this.projects[j].sections[i].tasks[k];
    //       }
    //     }
    //   }
    // }
    throw console.error("no task with id " + taskId);
  }
  deleteTask(task: Task) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    this.tasks = this.tasks.filter((value) => {
      return value.id !== task.id;
    });
    // for (let i = 0; i < this.projects.length; i++) {
    //   let sections = this.projects[i].sections;
    //   for (let j = 0; j < sections.length; j++) {
    //     let tasks = sections[j].tasks;
    //     tasks = tasks.filter(function (value, index, array) {
    //       return value.id !== task.id;
    //     });
    //   }
    // }
    this.fbService.deleteTask(uid, task);
  }
  updateTask(task: Task) {
    let uid = sessionStorage.getItem("uid");
    if (!uid) return;
    let oldTask = this.getTask(task.id);
    oldTask = task;
    this.fbService.updateTask(uid, task);
  }
}
