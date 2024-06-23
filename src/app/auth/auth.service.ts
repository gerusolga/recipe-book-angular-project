import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        user.getIdTokenResult().then(tokenResult => {
          const loadedUser = new User(user.email, user.uid, tokenResult.token, new Date(tokenResult.expirationTime));
          this.user.next(loadedUser);
          console.log('Authenticated user:', loadedUser); // Логирование авторизованного пользователя
        });
      } else {
        this.user.next(null);
        console.log('No authenticated user'); // Логирование отсутствия авторизованного пользователя
      }
    });
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }


  logout() {
    this.afAuth.signOut().then(() => {
      this.user.next(null);
      this.router.navigate(['/login']);
    });
  }
}

