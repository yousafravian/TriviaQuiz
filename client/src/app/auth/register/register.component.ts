import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {IUser} from "../../shared/user.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  http = inject(HttpClient);
  toastr = inject(ToastrService);
  router = inject(Router);

  username: string = 'YousafR';
  password: string = '1234567';


  onSignIn(): void {
    const payload: Partial<IUser> = {
      username: this.username,
      password: this.password
    }
    this.http.post<{ token: string, user: IUser }>('user/register', payload)
      .subscribe({
        next: ({token, user}) => {
          this.toastr.success('Registration successful!');

          this.router.navigate(['../login']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.NotFound) {
            this.toastr.error(err.error.message);
          }
        }
      });
  }

  showSuccess() {
  }
}
