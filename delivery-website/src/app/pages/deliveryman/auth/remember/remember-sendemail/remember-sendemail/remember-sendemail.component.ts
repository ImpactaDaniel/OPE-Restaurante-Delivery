import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-remember-sendemail',
  templateUrl: './remember-sendemail.component.html',
  styleUrls: ['./remember-sendemail.component.css']
})
export class RememberSendemailComponent implements OnInit {

  email: string;
  sendEmailForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sendEmailForm= this.formBuilder.group({
      email: ['', Validators.required]
    })
  }

  public async sendEmail() {
    this.email = this.sendEmailForm.get('email')?.value
    // let response = await this.authService.sendEmailRememberPassword(this.email)
    // console.log(response)
    console.log(this.email)
  }

}
