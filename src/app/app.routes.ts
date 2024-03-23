import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'create',
        component: UserFormComponent,
      },
      {
        path: 'edit/:id',
        component: UserFormComponent,
      },
      {
        path: 'delete/:id',
        component: DeleteUserComponent,
      },
    ],
  },
];
