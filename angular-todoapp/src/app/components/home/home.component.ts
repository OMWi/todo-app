import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsDataService } from 'src/app/services/projects-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  uid: string | null = null;

  constructor(private router: Router, public data: ProjectsDataService) {
  }

  async ngOnInit() {
    this.uid = sessionStorage.getItem("uid");
    if (!this.uid) {
      this.router.navigateByUrl("");
    }
  }

  searchStr = "";
  onSearchChange(searchStr: string) {
    console.log("search: " + searchStr);
    console.log("projects: " + this.data.projects);
    this.searchStr = searchStr;
  }

  getFilteredProjects() {
    let filteredData = this.data.getProjects().filter((val) => {
      return val.name.search(new RegExp(this.searchStr, 'i')) > -1
    });
    // console.log("filt data", filteredData);
    // if (filteredData.length == 0) {
    //   this.data.selectedProjectId == -1;
    // }
    // else {
    //   const isFound = filteredData.findIndex( project => {
    //     project.id == this.data.selectedProjectId;
    //   })
    //   console.log("isfound", isFound);
    //   if (!isFound) {
    //     this.data.selectedProjectId = filteredData[0].id;
    //   }
    // }
    return filteredData;
  }
}
