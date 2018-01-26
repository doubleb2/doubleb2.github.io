import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Http, Response, Headers , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/retry';
declare var $: any;

import {Endpoints} from '../../endpoints';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit, AfterViewInit{
  loginForm: FormGroup;
  alertMessage: string = '';
  state: string = 'small';

  constructor( private formBuilder: FormBuilder, private http: Http, private router: Router) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
    this.loginForm.valueChanges.subscribe(data => {
      this.alertMessage = '';
    });
  }

 ngAfterViewInit() {
  $( ".input" ).focusin(function() {
     $( this ).find( "span" ).animate({"opacity":"0"}, 200);
   });

   $( ".input" ).focusout(function() {
     $( this ).find( "span" ).animate({"opacity":"1"}, 300);
   });

   $(".login").submit(function(){
     $(this).find(".submit i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
     $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
     $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
     $("input").css({"border-color":"#2ecc71"});
     return false;
   });
 }


  onSubmit() {
   let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(Endpoints.databaseAuth, JSON.stringify(this.loginForm.value), options)
      .subscribe(
        (err) => {
          if(err) console.log(err);
          console.log('Success');
          this.router.navigate(['/dashboard']);
        });
    this.alertMessage = 'Access Denied!';
 }
}
