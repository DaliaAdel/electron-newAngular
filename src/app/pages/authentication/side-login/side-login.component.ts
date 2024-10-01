import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Data } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { environment } from 'src/enviroment/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatDialogModule], // MatDialogModule added here
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {

  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router ,private http: HttpClient , private dialog: MatDialog ,private userService: UserService) { }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    // EmailValidator
    //  email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });




  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    console.log(environment.apiUrl);
    this.http.post(`${environment.apiUrl}/login`, this.form.value).subscribe(
      (response: any) => {
        console.log('Data saved successfully:', response);
        
        this.userService.setLoginData(response.data); // Save the user data
        // Assuming dialogRef exists in your actual setup, close the dialog here
        this.router.navigate(['/dashboards/dashboard1']);
      },
      (error) => {
        console.error('Error saving data:', error);
        const dialogRef = this.dialog.open(ErrorDialogComponent,{
          height: '32%',
          width: '20%',
        });
        dialogRef.componentInstance.errorMessage = "خطأ فى كلمه المرور او اسم الستخدم"; // Pass the error message to the dialog


      }
    );

    // 
  }
}



@Component({
  selector: 'error-dialog',
  template: `
    <div class="container p-5 text-center">
      <h1 mat-dialog-title>تحذير</h1>
    <div mat-dialog-content class="my-3">
    <strong>
    {{errorMessage}}
    </strong>
      
    </div>
    <div mat-dialog-actions class="">
      <button mat-flat-button (click)="close()"  class="w-100 rounded" style="background-color : #0085db; color:white; border: 1px solid #0085db;">
        حســنا
      </button>
    </div>
    </div>
  `,
})
export class ErrorDialogComponent {
  errorMessage: string; // Variable to hold error message

  constructor(private dialogRef: MatDialogRef<ErrorDialogComponent>) {} // Use MatDialogRef to control dialog

  close() {
    this.dialogRef.close(); // Close dialog
  }
}
