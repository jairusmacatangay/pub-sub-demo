import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {

  constructor(private router: Router) {}
  
  displayUserList(): void {
    this.router.navigateByUrl('users');
  }
}
