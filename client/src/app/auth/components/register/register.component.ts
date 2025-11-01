import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username = '';
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  loading = false;

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.errorMessage = '';

    if (this.username && this.fullName && this.password && this.email && this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords need to match';
        return;
      }

      // separa fullName em fname e lname
      const names = this.fullName.trim().split(' ');
      const fname = names.shift() || 'NotSet';
      const lname = names.join(' ') || 'NotSet';

      this.loading = true;
      this._auth.register({
        username: this.username,
        fname,
        lname,
        email: this.email,
        password: this.password
      }).subscribe({
        next: (res) => {
          console.log('✅ Registered:', res);
          this.loading = false;
          this._router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Something went wrong';
          this.loading = false;
        }
      });

    } else {
      this.errorMessage = 'Make sure to fill everything ;)';
    }
  }

  canSubmit(): boolean {
    return (
      !!this.username &&
      !!this.fullName &&
      !!this.email &&
      !!this.password &&
      !!this.confirmPassword &&
      this.password === this.confirmPassword
    );
  }
}
