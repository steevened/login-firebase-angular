import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

const actionType = {
  signIn: {
    action: 'signIn',
    title: 'Sign In',
  },
  signUp: {
    action: 'signUp',
    title: 'Sign Up',
  },
} as const;

type ActionType = keyof typeof actionType;
@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  @Input() action!: ActionType;

  form!: FormGroup;
  title!: string;

  private formBuilder = inject(FormBuilder);
  private readonly emailPatter = '';
}
