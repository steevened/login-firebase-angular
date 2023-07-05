import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { AuthService } from '@app/pages/users/services/auth.service';
import { Observable } from 'rxjs';

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
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
})
export class AuthFormComponent implements OnInit {
  @Input() action!: ActionType;

  form!: FormGroup;
  title!: string;
  user$!: Observable<any>;

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly emailPatter = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPatter)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    const { email, password } = this.form.value;

    this.action === actionType.signIn.action
      ? 'this.signIn()'
      : 'this.signUp()';
  }

  hasError(field: string): boolean {
    const fieldName = this.form.get(field);
    return !!fieldName?.invalid && fieldName?.touched;
  }

  // signIn(): void {
  //   console.log('sign in');
  // }

  // signUp(): void {
  //   console.log('sign up');
  // }

  signInGoogle(): void {
    this.authService.signInGoogle();
  }

  ngOnInit(): void {
    this.title =
      this.action === actionType.signIn.action
        ? actionType.signIn.title
        : actionType.signUp.title;
    this.initForm();
    this.user$ = this.authService.userState$;
  }
}
