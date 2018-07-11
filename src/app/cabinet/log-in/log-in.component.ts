import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  showError = false;

  constructor(public _auth: AuthService, private router: Router) {
    this._auth.user.subscribe(next => {
      if (!isNullOrUndefined(next)) {
        router.navigateByUrl('/cabinet/admin');
      }
    }, error => {
      console.log(error);
    });
  }

  login(email, pass) {
    this._auth.logIn(email, pass).then(() => {
      this.router.navigateByUrl('/cabinet/admin');
    }).catch(() => {
      this.showError = true;
      setTimeout(()=>{this.showError = false}, 6000);
    });
  }


  ngOnInit() {
  }

}
