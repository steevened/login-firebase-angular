import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  authState,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User, signInWithRedirect } from 'firebase/auth';

interface ErrorResponse {
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly googleProvider = new GoogleAuthProvider();

  constructor() {}

  get userState$() {
    return authState(this.auth);
  }

  async signInGoogle(): Promise<void> {
    try {
      await signInWithRedirect(this.auth, this.googleProvider);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async signUp(email: string, password: string): Promise<void> {
    try {
      // create account
      // SendEmail
      // Redirect to welcome message page

      const { user } = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await this.sendEmailVerification(user);
      this.router.navigate(['/user/email-verification']);
    } catch (error: unknown) {
      const { code, message } = error as ErrorResponse;
      console.log('Code', code);
      console.log('Message', message);
      alert(error);
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      //signIn from firebase
      // check if email is verified
      //redirect to home

      const { user } = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.checkIfEmailIsVerified(user);
      this.router.navigate(['/']);
    } catch (error: unknown) {
      const { code, message } = error as ErrorResponse;
      console.log('Code', code);
      console.log('Message', message);
      alert(error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error: unknown) {}
  }

  async sendEmailVerification(user: User): Promise<void> {
    try {
      await sendEmailVerification(user);
    } catch (error: unknown) {
      console.log(error);
      alert(error);
    }
  }

  private checkIfEmailIsVerified(user: User): boolean {
    //TODO: check email verification
    return true;
  }
}
