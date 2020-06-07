// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ObservablesService } from "../observable/observable.service";
import { environment } from "../../../environments/environment";
//


/*
Definition
*/
@Injectable()
export class AuthService {

  // Inject module(s) in the service
  constructor(
    private HttpClient: HttpClient,
    private ObservablesService: ObservablesService
  ) { };

  // CRUD method: register
  public register(endpoint: String, data: any): Promise<any> {
    // Set header
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    // Launch request
    return this.HttpClient.post(`${environment.apiurl}/${endpoint}`, data, { headers: myHeader }).toPromise()
      .then(data => this.getData(endpoint, data))
      .catch(this.handleError);
  };

  // CRUD method: login
  public login(endpoint: String, data: any): Promise<any> {
    // Set header
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    // Launch request
    return this.HttpClient.post(`${environment.apiurl}/${endpoint}`, data, { headers: myHeader }).toPromise()
      .then(data => this.getData(endpoint, data))
      .catch(this.handleError);
  };

  // CRUD method: me
  public me(endpoint: String, data: any): Promise<any> {
    // Set header
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    // Launch request
    return this.HttpClient.post(`${environment.apiurl}/${endpoint}`, data, { headers: myHeader }).toPromise()
      .then(data => this.getData(endpoint, data))
      .catch(this.handleError);
  };


  /*
  Methods to get API responses
  */
  // Get the API response
  private getData = (endpoint, apiResponse: any) => {
    // Switch endpoint to set observable value
    switch (endpoint) {
      case 'login':
        // Set user info obserrbale value
        this.ObservablesService.setObservableData('login', apiResponse)

        // Return data
        return apiResponse || {};
        break;

      case 'me':
        // Set user info obserrbale value
        this.ObservablesService.setObservableData('me', apiResponse)

        // Return data
        return apiResponse || {};
        break;

      default:
        // Retun data anytime
        return apiResponse || {};
        break;
    };
  };

  // Get the API error
  private handleError = (apiError: any) => Promise.reject(apiError.error);
  //
};
//

