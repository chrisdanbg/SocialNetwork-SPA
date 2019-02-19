import { ListsResolver } from './_resolvers/lists.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes';
import { MemberEditResoslver } from './_resolvers/member-edit.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailsResoslver } from './_resolvers/member-details.resolver';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MessagesResolver } from './_resolvers/messages.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
            { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailsResoslver}},
            { path: 'member/edit', component: MemberEditComponent,
                      resolve: {user: MemberEditResoslver}, canDeactivate: [PreventUnsavedChanges]},
            { path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
            { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
