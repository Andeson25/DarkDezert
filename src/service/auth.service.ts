import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,private router: Router) {
    this.user = afAuth.user;
  }

  logIn(email, pass) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass)
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigateByUrl('/');
    }).catch(error => {
      console.log(error);
    });
  }
}
