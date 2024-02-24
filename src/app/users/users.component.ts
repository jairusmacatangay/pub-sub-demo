import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ProductService } from '../_shared/services/product.service';
import { User } from '../_shared/models/user.model';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, NgFor, RouterOutlet],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [ProductService],
})
export class UsersComponent {
  users$: Observable<any[]>;

  constructor(private productService: ProductService, private router: Router) {
    this.users$ = this.productService.getProductsObservable();
  }

  async addDocument(): Promise<void> {
    const user: User = {
      first: 'Isaac',
      last: 'Newton',
      born: 1643,
    };

    await this.productService.create(user);
  }

  async addDocument2(): Promise<void> {
    const user: User = {
      first: 'Stephen',
      last: 'Hawking',
      born: 1942,
    };

    await this.productService.create(user);
  }

  displayCreateForm(): void {
    this.router.navigateByUrl('/users/create');
  }
}