import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: FormControl): Observable<ValidationErrors> => {
    const { value } = control;

    return this.authService.usernameAvailable(value)
      .pipe(
        map(response => {
          if (response.available) {
            return null;
          }
        }),
        catchError(err => {
          if (err.error.username) {
            return of({ nonUniqueUsername: true });
          }

          return of ({ noConnection: true });
        })
      );
  }
}
