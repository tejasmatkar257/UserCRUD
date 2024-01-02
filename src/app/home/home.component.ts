import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  UserForm!: FormGroup;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder,private http: HttpClient){}

  ngOnInit(){
    this.UserForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobileNumber: ['', [Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]],
      gender: ['', Validators.required]
    });
  }

  

  OnSubmit() {this.formSubmitted = true;

  if (this.UserForm.valid) {
    // Form is valid, proceed with submission
    const userData = this.UserForm.value;

    // Make a POST request to the JSON server's API
    this.http.post('http://localhost:3000/users', userData)
      .subscribe(response => {
        console.log('Data saved successfully:', response);
        // Optionally, you can reset the form after successful submission
        this.UserForm.reset();
        this.formSubmitted = false;
      }, error => {
        console.error('Error saving data:', error);
      });
  } else {
    // Form is invalid, handle validation errors
    console.log('Form contains validation errors.');
  }
}
}


