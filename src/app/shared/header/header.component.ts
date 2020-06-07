import { Component, OnInit } from '@angular/core';
import { ObservablesService } from "../../services/observable/observable.service";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  /*
  Declaration
  */
  // Properties
  public userData: any;

  constructor(
    private ObservablesService: ObservablesService,
    private AuthService: AuthService,
    private Router: Router
  ) {
    // Get user data observer
    this.ObservablesService.getUserInfo().subscribe(userDataObserver => {
      if (userDataObserver === null) { this.userData = null }
      else {
        if (Object.keys(userDataObserver).length > 0) {
          // Update userData value
          this.userData = userDataObserver;
        } else {
          this.userData = null
        }
      }
    })

    this.ObservablesService.getUserToken().subscribe(userDataObserver => {
      // Set local storage
      if (userDataObserver !== null)
        localStorage.setItem('userToken', userDataObserver);
    })

  }
  //

  public logout = () => {
    // Delete localstorage
    localStorage.removeItem('userToken');

    // Set user info obserrbale value
    this.ObservablesService.setObservableData('logout', null);
  }

  ngOnInit() { };
};
