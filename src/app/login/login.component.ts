import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: RouterExtensions) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username === 'testuser' && password === 'password123') {
        console.log('Login successful');
        ApplicationSettings.setString('user', username);
        this.router.navigate(['/tasks']);
      } else {
        console.log('Login failed');
        alert('Invalid username or password');
      }
    } else {
      console.log('Form is not valid');
      alert('Please fill out all fields');
    }
  }
}
