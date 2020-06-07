// IMPORTS

  // Angular
  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";

  // Inner
  import { CrudService } from '../../services/crud/crud.service';
  import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-connected-page',
  templateUrl: './connected-page.component.html',
  styles: [
  ]
})

export class ConnectedPageComponent implements OnInit {

  // Public
  public userLogged = false;
  public sources: any;
  public formSearchData: FormGroup;
  public listNews: any;
  public lastSourceLocalStorage: String;
  public lastKeywordsLocalStorage: String;
  public myBookmarks: any;

  // Private
  constructor(
    private CrudService: CrudService,
    private AuthService: AuthService,
    private Router: Router,
    private FormBuilder: FormBuilder
  ) { }

  // Reset form news
  public resetForm = () => {
    this.formSearchData = this.FormBuilder.group({
      source: [null, Validators.required],
      keywords: [null]
    });
  };

  // Search news
  public search = (value) => {
    localStorage.setItem('last-sources', value.source);
    localStorage.setItem('last-keywords', value.keywords);

    if (value.keywords === null || value.keywords === '') {
      this.CrudService.readOneNews('news', value.source)
        .then(data => {
          this.listNews = data.data.articles;
        })
        .catch(error => {
          console.log('ERROR request', error);
        });
    } else {
      this.CrudService.readOneNewsWithKeyword('news', value.source, value.keywords)
        .then(data => {
          this.listNews = data.data.articles;

        })
        .catch(error => {
          console.log('ERROR request', error);
        });
    }
  }

  // Get user infos
  public getUserInfo = (value) => {
    // Create the json
    const formDataForApi = {
      'email': value.email,
      'password': value.password
    }

    // Get user infos
    const userInfo = this.AuthService.login('login', formDataForApi);

    // Check user info
    if (Object.keys(userInfo).length > 0) {
      // Change route endpoint
      setTimeout(() => this.Router.navigateByUrl('/connected'), 500);
      this.userLogged = true;
    }
  };

  // Get all sources
  public getSources = () => {
    this.CrudService.readAllItems('sources')
      .then(data => {
        this.sources = data.sources;
      })
      .catch(error => {
        console.log('ERROR request', error);
      });
  }

  // Check last source and last keywords
  public checkLocalStorage = () => {
    // Check if last source exist
    if (localStorage.getItem('last-sources') != null) {
      let data = {
        source: localStorage.getItem('last-sources'),
        keywords: localStorage.getItem('last-keywords')
      }

      this.lastSourceLocalStorage = localStorage.getItem('last-sources');
      this.lastKeywordsLocalStorage = localStorage.getItem('last-keywords');

      // Call search method
      this.search(data);
    }
  }

  // Add a bookmaark
  public addToBookmarks = (sources) => {
    let sourceInfo;
    this.sources.forEach(source => {
      if (source.id == sources) {
        // Create the json
        sourceInfo = {
          "id": source.id,
          "name": source.name,
          "description": source.description,
          "url": source.url,
          "category": source.category,
          "language": source.language,
          "country": source.country,
          "token": localStorage.getItem('userToken')
        }
      }
    });

    // Call API
    this.CrudService.addOneBookmark('bookmark', sourceInfo)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log('ERROR request', error);
      });
  }

  ngOnInit(): void {
    this.resetForm();
    this.getSources();
    this.checkLocalStorage();
  }

}
