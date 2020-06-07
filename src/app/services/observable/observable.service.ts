/*
Imports
*/
  import { Injectable } from '@angular/core';
  import { BehaviorSubject, Observable } from 'rxjs';
//

/*
Definition and export
*/
@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  constructor() { }

  protected userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected userToken: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public getUserInfo(): Observable<any> { return this.userInfo };
  public getUserToken(): Observable<any> { return this.userToken };

  public setObservableData = (type: string, data: any) => {
    switch (type) {
      case 'login':
        this.userInfo.next(data.data.user);
        this.userToken.next(data.data.token);
        break;

      case 'me':
        this.userInfo.next(data.data.user);
        break;

      case 'logout':
        this.userInfo.next(data);
        this.userToken.next(data);
      default:
        break;
    };
  };

}
//
