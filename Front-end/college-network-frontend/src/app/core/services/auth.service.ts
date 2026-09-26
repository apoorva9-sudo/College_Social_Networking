import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<string> {

    return this.http.post(
      `${this.apiUrl}/login`,
      request,
      {
        responseType: 'text'
      }
    ).pipe(

      tap((token) => {
        localStorage.setItem('token', token);
      })

    );
  }


  logout(): void {

    localStorage.removeItem('token');

  }


  getToken(): string | null {

    return localStorage.getItem('token');

  }


  isLoggedIn(): boolean {

    return !!this.getToken();

  }


  // --------------------------------
  // GET ROLE FROM JWT
  // --------------------------------

  // getRole(): string | null {

  //   const token = this.getToken();

  //   if (!token) {
  //     return null;
  //   }

  //   try {

  //     const payload = JSON.parse(
  //       atob(
  //         token.split('.')[1]
  //       )
  //     );

  //     /*
  //      * Depending on your backend JwtUtil,
  //      * the role may be stored as:
  //      *
  //      * role
  //      * roles
  //      * authorities
  //      */

  //     if (payload.role) {
  //       return payload.role;
  //     }

  //     if (payload.roles) {

  //       if (Array.isArray(payload.roles)) {
  //         return payload.roles[0];
  //       }

  //       return payload.roles;
  //     }

  //     if (payload.authorities) {

  //       if (Array.isArray(payload.authorities)) {

  //         return payload.authorities[0]
  //           .replace('ROLE_', '');

  //       }

  //       return payload.authorities
  //         .replace('ROLE_', '');
  //     }

  //     return null;

  //   } catch (error) {

  //     console.error(
  //       'Unable to decode JWT:',
  //       error
  //     );

  //     return null;
  //   }
  // }


  // --------------------------------
  // PROFILE
  // --------------------------------

  getMyProfile(): Observable<any> {

    return this.http.get(
      'http://localhost:8080/api/users/me'
    );

  }

}