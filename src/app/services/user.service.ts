import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// export class UserService {

//   constructor() { }
// }


export class UserService {
  // Store the login data using a BehaviorSubject
  private loginDataSubject = new BehaviorSubject<any>(null);

  // Expose the login data as an observable so other components can subscribe to it
  loginData$: Observable<any> = this.loginDataSubject.asObservable();

  // Save login data (can include token, username, etc.)
  setLoginData(data: any) {
    // console.log("sss",data.token);
  
    localStorage.setItem('userData', JSON.stringify(data));  // Store in local storage
    localStorage.setItem('authToken', data.token);  // Store token
    // console.log("sss",data.token);
    this.loginDataSubject.next(data);  // Update the BehaviorSubject
  }

  // Get the login data (usually needed for auto-login scenarios)
  getLoginData() {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.loginDataSubject.next(JSON.parse(storedData));  
    }
  }

  // Clear login data (for logout)
  clearLoginData() {
    localStorage.removeItem('userData');  // Remove from local storage
    localStorage.removeItem('authToken');  // Clear token
    this.loginDataSubject.next(null);  // Clear the BehaviorSubject
  }

  // Optional: Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userData');
  }
  
  getAuthToken() {
    return localStorage.getItem('authToken');
  }
}