import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../data-models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  login(user: User) {
    this.fireAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(value => {
        let uid = value!['user']!['uid'];
        if (uid) {
          sessionStorage.setItem('uid', uid);
          this.router.navigateByUrl('/home');
        }
      }).catch(err => {
        alert('Login error: ' + err.message);
      });

  }

  signup(user: User) {
    this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(value => {
        let uid = value!['user']!['uid'];
        if (uid) {
          sessionStorage.setItem('uid', uid);
          this.router.navigateByUrl('/home');
        }
      }).catch(err => {
        alert('Signup error: ' + err.message);
      })
  }

}
