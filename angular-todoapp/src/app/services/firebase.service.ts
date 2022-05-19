import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Project } from '../data-models/project';
import { Section } from '../data-models/section';
import { Task } from '../data-models/task';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  addProject(uid: string, project: Project) {
    this.db.database.ref(uid + "/projects/" + project.id).set({
      "name": project.name
    })
  }
  addSection(uid: string, section: Section, projectId: number) {
    this.db.database.ref(uid + "/sections/" + section.id).set({
      "name": section.name,
      "projectId": projectId
    })
  }
  addTask(uid: string, task: Task) {
    this.db.database.ref(uid + "/tasks/" + task.id).set({
      "title": task.title,
      "description": task.description,
      "priority": task.priority,
      "sectionId": task.sectionId
    })
  }

  updateProject(uid: string, project: Project) {
    this.db.database.ref(uid + "/projects/" + project.id).update({
      "name": project.name
    })
  }
  updateSection(uid: string, section: Section, projectId: number) {
    this.db.database.ref(uid + "/sections/" + section.id).update({
      "name": section.name,
      "projectId": projectId
    })
  }
  updateTask(uid: string, task: Task) {
    this.db.database.ref(uid + "/tasks/" + task.id).update({
      "title": task.title,
      "description": task.description,
      "priority": task.priority,
      "sectionId": task.sectionId
    })
  }

  getProjects(uid: string) {
    return this.db.database.ref(uid + "/projects").get();
  }
  getSections(uid: string) {
    return this.db.database.ref(uid + "/sections").get();
  }
  getTasks(uid: string) {
    return this.db.database.ref(uid + "/tasks").get();
  }

  deleteProject(uid: string, projectId: number) {
    this.db.database.ref(uid + "/projects/" + projectId).remove();
  }
  deleteSection(uid: string, sectionId: number) {
    this.db.database.ref(uid + "/sections/" + sectionId).remove();
  }
  deleteTask(uid: string, taskId: number) {
    this.db.database.ref(uid + "/tasks/" + taskId).remove();
  }
}
