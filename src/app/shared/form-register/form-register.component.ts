import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styles: [
  ]
})
export class FormRegisterComponent implements OnInit {

  // Declarations
  public formData: FormGroup;
  @Output() formSubmit = new EventEmitter();


  // Inject FormBuilder
  constructor(
    private FormBuilder: FormBuilder
  ) { }

  // Method to reset form
  private resetForm = () => {
    this.formData = this.FormBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      repeatpassword: [null, Validators.required]
    });
  };

  // Start
  ngOnInit() {
    this.resetForm();
  }

}
