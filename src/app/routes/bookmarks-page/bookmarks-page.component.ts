// IMPORTS

  // Angular
  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";

  // Inner
  import { CrudService } from '../../services/crud/crud.service';
  import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-bookmarks-page',
  templateUrl: './bookmarks-page.component.html'
})

export class BookmarksPageComponent implements OnInit {

  // Public
  public myBookmarks: any;
  public formSearchData: FormGroup;
  public listNews: any;

  // Private
  constructor(
    private CrudService: CrudService,
    private AuthService: AuthService,
    private FormBuilder: FormBuilder
  ) { }

  // Reset form news
  public resetForm = () => {
    this.formSearchData = this.FormBuilder.group({
      source: [null, Validators.required],
      keywords: [null]
    });
  };

  // Remove a bookmark
  public removeBookmark = (value) => {
    let _id;

    this.myBookmarks.forEach(bookmark => {
      if (bookmark.id == value) {
        _id = bookmark._id;
      }
    });

    // Call API
    this.CrudService.deleteBookmark('bookmark', _id, localStorage.getItem('userToken'))
      .then(data => {
        this.getMe();
        this.resetForm();
      })
      .catch(error => {
        console.log('ERROR request', error);
      });
  }

  // Search news
  public search = (value) => {
    // Check if keywords doesn't exist
    if (value.keywords === null || value.keywords === '') {
      // Without Keywords
      // Call API
      this.CrudService.readOneNews('news', value.source)
        .then(data => {
          this.listNews = data.data.articles;
        })
        .catch(error => {
          console.log('ERROR request', error);
        });
    } else {
      // With Keywords
      // Call API
      this.CrudService.readOneNewsWithKeyword('news', value.source, value.keywords)
        .then(data => {
          this.listNews = data.data.articles;

        })
        .catch(error => {
          console.log('ERROR request', error);
        });
    }
  }

  // Get bookmarks
  public getMe = () => {
    // Call API
    this.AuthService.me('me', { 'token': localStorage.getItem('userToken') })
      .then(data => {
        this.myBookmarks = data.data.bookmark;
      })
      .catch(error => {
        console.log('ERROR request', error);
      });
  }

  ngOnInit(): void {
    this.resetForm();
    this.getMe();
  }

}
