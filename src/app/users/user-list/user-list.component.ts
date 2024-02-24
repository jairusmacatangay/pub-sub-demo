import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../_shared/services/product.service';
import { Router } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { User } from '../../_shared/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.productService.getProducts().then((res: User[]) => {
      this.isLoading = false;
      this.users = res;
    });
  }

  displayCreateForm(): void {
    this.router.navigateByUrl('/users/create');
  }
}
