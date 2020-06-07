// Angular
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders} from '@angular/common/http';

  import { ObservablesService } from "../observable/observable.service";
  import { environment } from "../../../environments/environment";
//


/*
Definition
*/
@Injectable()
export class CrudService {

  // Inject module(s) in the service
  constructor(
    private HttpClient: HttpClient,
    private ObservablesService: ObservablesService
  ) { };

  // CRUD method: read all items
  public readAllItems(endpoint: String): Promise<any> {
    return this.HttpClient.get(`${environment.apinewsurl}/${endpoint}?apiKey=${environment.apikey}`).toPromise()
      .then(data => this.getData(endpoint, data))
      .catch(this.handleError);
  };

  // Read one source
  public readOneNews(endpoint: String, newsId: String): Promise<any> {
    // Set header
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    // Launch request
    return this.HttpClient.post(`${environment.apiurl}/${endpoint}/${newsId}/null`, {news_api_token: environment.apikey}, { headers: myHeader }).toPromise()
      .then(data => this.getData(endpoint, data))
      .catch(this.handleError);
  };

  // Read one source width keyword
  public readOneNewsWithKeyword(endpoint: String, newsId: String, keyword: String): Promise<any> {
    // Set header
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    // Launch request
    return this.HttpClient.post(`${environment.apiurl}/${endpoint}/${newsId}/${keyword}`, { news_api_token: environment.apikey }, { headers: myHeader }).toPromise()
      .then(data => this.getData(endpoint, data))
      .catch(this.handleError);
  };

  // Add one bookmark
  public addOneBookmark(endpoint: String, data: any): Promise<any> {
    // Set header
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    // Launch request
    return this.HttpClient.post(`${environment.apiurl}/${endpoint}`, data, { headers: myHeader }).toPromise()
      .then(data => this.getData(endpoint, data))
      .catch(this.handleError);
  };

  // Delete bookmark
  public deleteBookmark(endpoint: String, _id: String, data: any): Promise<any> {
    // Set header
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    const options = {
      headers: myHeader,
      body: {
        token: data
      }
    }

    // Launch request
    return this.HttpClient.delete(`${environment.apiurl}/${endpoint}/${_id}`, options).toPromise()
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
