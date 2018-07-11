import {Component, OnInit} from '@angular/core';
import {Email} from '../../model/email';
import {Image} from '../../model/image';
import {Phone} from '../../model/phone';
import {Links} from '../../model/links';
import {EmailService} from '../../service/email.service';
import {PhoneService} from '../../service/phone.service';
import {LinksService} from '../../service/links.service';
import {ImageService} from '../../service/image.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  email: Email = new Email();
  img: Image[] = [];
  phone: Phone = new Phone();
  links: Links = new Links();

  constructor(private _em: EmailService, private _ph: PhoneService, private _lk: LinksService, private _im: ImageService) {
    this._im.findAll().subscribe(next => {
      this.img = next;
      setTimeout(() => {

        let images = document.getElementsByClassName('image') as HTMLCollectionOf<HTMLElement>;
        images[0].style.opacity = '1';
        let counter = 0;
        setInterval(() => {
          counter++;
          if (counter === images.length) {
            images[images.length - 1].style.opacity = '0';
            images[0].style.opacity = '1';
            counter = 0;
            return;
          }
          images[counter - 1].style.opacity = '0';
          images[counter].style.opacity = '1';
        }, 5000);
      }, 500);
      this._em.findAll().subscribe(next => {
        this.email = next[0];
        this._ph.findAll().subscribe(next => {
          this.phone = next[0];
          this._lk.findAll().subscribe(next => {
            this.links = next[0];
            document.getElementById('content').style.opacity = '1';
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
}
