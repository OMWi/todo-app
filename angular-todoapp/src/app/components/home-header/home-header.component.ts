import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  menuIcon = faBars;
  userIcon = faUser;

  @Output() searchStrChange: EventEmitter<string> = new EventEmitter();
  // @Input() projectName = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchStr = "";
  onSearchChange(searchStr: string) {
    this.searchStrChange.emit(searchStr);
  }

  onButtonSidemenuClick() {
    document.getElementById("sidemenu")?.classList.toggle("sidemenu-open")
  }

  onLogoutClick() {
    sessionStorage.removeItem("uid");
    this.router.navigateByUrl("");    
  }
}
