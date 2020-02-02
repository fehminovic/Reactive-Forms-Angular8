import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray } from "@angular/forms";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.signupForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),

      password_group: new FormGroup({
        password: new FormControl(null, [Validators.required]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
        [this.matchPasswords.bind(this)]
      ),

      phones: new FormArray([]),
      

    });

  }
  matchPasswords(control: AbstractControl): { [key: string]: boolean } {
    if (control.get("password").value === control.get("confirmPassword").value) {
      return null;
    }
    return { passwordMatchError: true };
  }

  getControls() {
    return (<FormArray>this.signupForm.get("phones")).controls;
  }

  onAddPhonesClick() {
    if (this.signupForm.get("phones").value.length < 4) {
      const control = new FormControl(null);
      (this.signupForm.get("phones") as FormArray).push(control);
    } else {
      alert("You can add maximum 4 phone numbers");
    }
  }

  onRemovePhonesClick(i) {
    (this.signupForm.get("phones") as FormArray).removeAt(i);
  }

  onSubmit() {
    console.log(this.signupForm);
    let phonesStr = "";
    for (let i = 0; i < this.signupForm.get("phones").value.length; i++) {
      if (i + 1 < this.signupForm.get("phones").value.length) {
        phonesStr += this.signupForm.get("phones").value[i] + ",";

      } 
      
      else {
        phonesStr += this.signupForm.get("phones").value[i];
      }
      Swal.fire({
       
        text: 'Press OK to continue',
       
        confirmButtonText: 'OK'
      })
    
    }
   
  

  }


}