import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(result => {
      if (result.user) {
        result.user.getIdTokenResult().then(tokenResult => {
          this.handleAuthentication(
            result.user.email,
            result.user.uid,
            tokenResult.token,
            +tokenResult.expirationTime
          );
        });
      }
    }).catch(error => {
      console.error(error);
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(result => {
      if (result.user) {
        result.user.getIdTokenResult().then(tokenResult => {
          this.handleAuthentication(
            result.user.email,
            result.user.uid,
            tokenResult.token,
            +tokenResult.expirationTime
          );
        });
      }
    }).catch(error => {
      console.error(error);
    });
  }

  private handleAuthentication(email: string, userId: string, token: string, expirationTime: number) {
    const expirationDate = new Date(expirationTime * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.user.next(null);
      return this.router.navigate(['/login']); // Обработка Promise
    }).then(() => {
      localStorage.removeItem('userData');
    }).catch(error => {
      console.error('Logout error:', error);
    });
  }
}

