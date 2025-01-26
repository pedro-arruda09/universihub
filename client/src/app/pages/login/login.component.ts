import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class LoginComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    login(event: Event): void {
        event.preventDefault();
        console.log('Login clicked');
    }
}
