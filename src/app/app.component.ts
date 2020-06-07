/*
Import
*/
  // Angular
  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';

  import { CrudService } from "./services/crud/crud.service";
  import { AuthService } from "./services/auth/auth.service";
//

/*
Componant configuration
*/
  @Component({
    selector: 'app-root',
    template: `
        <app-header></app-header>
        <router-outlet></router-outlet>
      `
  })
//


/*
Componant class definition
*/
  export class AppComponent implements OnInit {

    constructor(
      private CrudService: CrudService,
      private AuthService: AuthService,
      private Router: Router
    ) { }

    async ngOnInit() {
      if (localStorage.getItem('userToken') !== null) {
        const userInfo = await this.AuthService.me('me', { 'token': localStorage.getItem('userToken') });

        // Check user info
        if (Object.keys(userInfo).length > 0) {
          // Change route endpoint
          this.Router.navigateByUrl('/connected');
        };
      }
    };
  }
//
