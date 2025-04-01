import { Component } from '@angular/core';
import { AuthResponse, UserModel } from '../../interfaces/auth-response';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: UserModel = {
    email: '',
    password: '',
    name: '',
    updated_at: '',
    created_at: '',
    id: 0
  };

  constructor(private authService: AuthServiceService, private router: Router) {}

    login(){

      this.authService.login(this.user).subscribe(
        (response: AuthResponse) => {
          localStorage.setItem('token', response.token);  // Save token in local storage (optional)
          this.router.navigate(['/dashboard']);  // Redirect to dashboard
        }
      );
    }
}
