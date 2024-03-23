import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../_shared/services/product.service';
import { UpsertUser } from '../../_shared/requests/upsert-user.request';
import { NgIf } from '@angular/common';
import { BreadcrumbsComponent } from "../../_shared/components/breadcrumbs/breadcrumbs.component";

@Component({
    selector: 'app-create-user',
    standalone: true,
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.scss',
    imports: [RouterLink, FormsModule, NgIf, BreadcrumbsComponent]
})
export class UserFormComponent implements OnInit {
  id: string | undefined;

  isEdit: boolean = false;
  action: string = 'Create';

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
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => (this.id = params['id']));

    this.isEdit = this.id !== undefined;
    this.action = this.isEdit ? 'Edit' : 'Create';

    await this.populateForm();
  }

  async populateForm() {
    if (this.isEdit && this.id) {
      this.isLoading = true;

      const user = await this.productService.getProduct(this.id);

      this.model = {
        first: user?.first!,
        middle: user?.middle,
        last: user?.last!,
        born: user?.born,
      };

      this.isLoading = false;
    }
  }

  closeAlert(): void {
    this.isError = false;
    this.errorMessage = '';
  }

  displayUserList(): void {
    this.router.navigateByUrl('users');
  }

  onSubmit(): void {
    this.isSubmitting = true;

    const operation = this.isEdit
      ? this.productService.update(this.id!, this.model)
      : this.productService.create(this.model);

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
