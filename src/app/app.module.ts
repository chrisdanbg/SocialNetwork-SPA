import { MessagesResolver } from './_resolvers/messages.resolver';
import { Pagination } from './_models/pagination';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes';
import { MemberEditResoslver } from './_resolvers/member-edit.resolver';
import { MemberDetailsResoslver } from './_resolvers/member-details.resolver';
import { UserService } from './_services/user.service';
import { appRoutes } from './routes';
import { Routes, RouterModule } from '@angular/router';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { AlertifyService } from './alertify.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxGalleryModule } from 'ngx-gallery';
import {TimeAgoPipe} from 'time-ago-pipe';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ValueComponent} from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadComponent } from './members/file-upload/file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    FileUploadComponent,
    TimeAgoPipe,
    MemberMessagesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/auth/']
      }
    }),
    NgxGalleryModule
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChanges,
    UserService,
    MemberDetailsResoslver,
    MemberListResolver,
    MemberEditResoslver,
    MessagesResolver,
    ListsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
