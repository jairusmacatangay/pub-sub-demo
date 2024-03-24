import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UpsertUser } from '../../_shared/requests/upsert-user.request';
import { NgIf } from '@angular/common';
import { BreadcrumbsComponent } from '../../_shared/components/breadcrumbs/breadcrumbs.component';
import { IUserService } from '../../_shared/interfaces/user-service.interface';
import { UserService } from '../../_shared/services/user.service';
import { AlertComponent } from '../../_shared/components/alert/alert.component';

@Component({
  selector: 'app-create-user',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  imports: [RouterLink, FormsModule, NgIf, BreadcrumbsComponent, AlertComponent],
  providers: [UserService],
})
export class UserFormComponent implements OnInit {
  id: string | undefined;

  isEdit: boolean = false;
  action: string = 'Create';

  isFound: boolean = true;

  isLoading: boolean = false;

  isSubmitting: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';

  model: UpsertUser = {
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

    this.isEdit = this.id !== undefined;
    this.action = this.isEdit ? 'Edit' : 'Create';

    await this.populateForm();
  }

  async populateForm() {
    if (this.isEdit) {
      this.isLoading = true;

      const user = await this.userService.getUser(this.id!);

      if (user) {
        this.model = {
          first: user?.first!,
          middle: user?.middle,
          last: user?.last!,
          born: user?.born,
        };
        
        this.isFound = true;
      } else {
        this.isFound = false;
      }

      this.isLoading = false;
    }
  }

  onCloseAlert(): void {
    this.isError = false;
    this.errorMessage = '';
  }

  displayUserList(): void {
    this.router.navigateByUrl('users');
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const operation = this.isEdit
      ? this.userService.update(this.id!, this.model)
      : this.userService.create(this.model);

    operation
      .then(() => this.displayUserList())
      .catch(() => {
        this.isError = true;
        this.errorMessage = `Oops! Something went wrong while ${
          this.isEdit ? 'updating' : 'creating'
        } the user. Please try again. If error persists, please contact support.`;
      })
      .finally(() => {
        this.isSubmitting = false;
      });
  }
}
