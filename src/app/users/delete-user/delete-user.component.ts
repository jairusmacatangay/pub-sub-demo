import { Component, Inject, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../_shared/components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../_shared/models/user.model';
import { NgIf } from '@angular/common';
import { IUserService } from '../../_shared/interfaces/user-service.interface';
import { UserService } from '../../_shared/services/user.service';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
  imports: [BreadcrumbsComponent, NgIf],
  providers: [UserService],
})
export class DeleteUserComponent implements OnInit {
  id: string | undefined;

  isLoading: boolean = false;

  isFound: boolean = true;

  isSubmitting: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';

  model: User = {
    id: '',
    first: '',
    middle: '',
    last: '',
    born: undefined,
  };

  constructor(
    private router: Router,
    @Inject(UserService) private userService: IUserService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => (this.id = params['id']));
    await this.populateUser();
  }

  async populateUser(): Promise<void> {
    this.isLoading = true;

    const user = await this.userService.getUser(this.id!);

    if (user) {
      this.model = {
        id: this.id!,
        first: user?.first,
        middle: user?.middle,
        last: user?.last,
        born: user?.born,
      };

      this.isFound = true;
    } else {
      this.isFound = false;
    }

    this.isLoading = false;
  }

  displayUserList(): void {
    this.router.navigateByUrl('users');
  }

  handleDelete(): void {
    this.isSubmitting = true;

    // TODO: display alert message UI
    this.userService
      .delete(this.id!)
      .then(() => this.displayUserList())
      .catch(() => alert('Failed to delete user.'))
      .finally(() => (this.isSubmitting = false));
  }
}
