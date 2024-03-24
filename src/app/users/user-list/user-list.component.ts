import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../../_shared/models/user.model';
import { UserService } from '../../_shared/services/user.service';
import { IUserService } from '../../_shared/interfaces/user-service.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, NgIf],
  providers: [UserService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = false;

  constructor(
    @Inject(UserService) private userService: IUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.userService.getUsers().then((res: User[]) => {
      this.isLoading = false;
      this.users = res;
    });
  }

  displayCreateForm(): void {
    this.router.navigateByUrl('/users/create');
  }

  displayEditForm(id: string): void {
    this.router.navigate(['/users/edit', id]);
  }

  displayDeleteConfirmation(id: string): void {
    this.router.navigate(['/users/delete', id]);
  }
}
