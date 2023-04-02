import { Component, OnInit } from '@angular/core';
declare var KTLayoutAsideToggle: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      KTLayoutAsideToggle.init('kt_aside_toggle');
    }, 50);
  }


}
