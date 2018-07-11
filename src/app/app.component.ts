import {Component} from '@angular/core';
import {EmailService} from '../service/email.service';
import {Email} from '../model/email';
import {LinksService} from '../service/links.service';
import {AuthService} from '../service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    // _email.findAll().subscribe(next => {
    //   this.emails = next;
    //   console.log(this.emails);
    //
    // });
    // this._email.findOne('CfBE6KBw2GyvcGroKrwT').subscribe(next => {
    //   console.log(next);
    // });
    // let em = new Email();
    // em.email = 'zalupa';

    // this._email.save(em);
    // this._links.findAll().subscribe(next => {
    //   console.log(next);
    // },error => {
    //     console.log(error);
    // });
  }


}
