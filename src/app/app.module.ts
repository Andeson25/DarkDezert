import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {config} from '../environments/config.config';
import {AngularFireModule, FirebaseStorage} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {EmailService} from '../service/email.service';
import {PhoneService} from '../service/phone.service';
import {LinksService} from '../service/links.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from '../service/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CabinetComponent} from './cabinet/cabinet.component';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {LogInComponent} from './cabinet/log-in/log-in.component';
import {AdminComponent} from './cabinet/admin/admin.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      {
        path: '', component: MainPageComponent
      },
      {
        path: 'cabinet', component: CabinetComponent, children: [
          {
            path: '', component: LogInComponent
          },
          {
            path: 'admin', component: AdminComponent
          }
        ]
      }
    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    CabinetComponent,
    MainPageComponent,
    LogInComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    RouterModule.forRoot(routes, {useHash: true}),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EmailService,
    PhoneService,
    LinksService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
