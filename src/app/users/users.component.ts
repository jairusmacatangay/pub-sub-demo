import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ProductService } from '../_shared/services/product.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, NgFor, RouterOutlet],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [ProductService],
})
export class UsersComponent {}
