import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {ImageService} from '../../../service/image.service';
import {Image} from '../../../model/image';
import {LinksService} from '../../../service/links.service';
import {PhoneService} from '../../../service/phone.service';
import {EmailService} from '../../../service/email.service';
import {Links} from '../../../model/links';
import {Email} from '../../../model/email';
import {Phone} from '../../../model/phone';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  email: Email = new Email();
  img: Image[] = [];
  phone: Phone = new Phone();
  links: Links = new Links();


  constructor(private router: Router, private AuthService: AuthService, private _em: EmailService, private _ph: PhoneService, private _lk: LinksService, private _im: ImageService) {
    this.AuthService.user.subscribe(next => {
      if (isNullOrUndefined(next)) {
        this.router.navigateByUrl('/cabinet');
      }
    }, error => {
      console.log(error);
    });
    this._im.findAll().subscribe(next => {
      this.img = next;

      this._em.findAll().subscribe(next => {
        this.email = next[0];
        this._ph.findAll().subscribe(next => {
          this.phone = next[0];
          this._lk.findAll().subscribe(next => {
            this.links = next[0];
          }, error => {
            console.log(error);
          });
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }


  ngOnInit() {
  }

  upload(event) {
    event.preventDefault();
    this._im.uploadPhoto(event);
  }

  delete(image: Image) {
    this._im.delete(image);
  }

  logOut() {
    this.AuthService.logout();
  }
  update(){
    this._lk.update(this.links);
    this._ph.update(this.phone);
    this._em.update(this.email);
  }

}
