import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../_shared/components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../_shared/services/product.service';
import { User } from '../../_shared/models/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
  imports: [BreadcrumbsComponent, NgIf],
})
export class DeleteUserComponent implements OnInit {
  id: string | undefined;

  isLoading: boolean = false;

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
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => (this.id = params['id']));
    await this.populateUser();
  }

  async populateUser(): Promise<void> {
    this.isLoading = true;

    const user = await this.productService.getProduct(this.id!);

    // TODO: handle undefined user
    if (user) {
      this.model = {
        id: this.id!,
        first: user?.first,
        middle: user?.middle,
        last: user?.last,
        born: user?.born,
      };

      this.isLoading = false;
    }
  }

  displayUserList(): void {
    this.router.navigateByUrl('users');
  }

  handleDelete(): void {
    this.isSubmitting = true;

    // TODO: display alert message UI
    this.productService
      .delete(this.id!)
      .then(() => this.displayUserList())
      .catch(() => alert('Failed to delete user.'))
      .finally(() => (this.isSubmitting = false));
  }
}
