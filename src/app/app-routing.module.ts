import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './User/signup/signup.component';
import { LoginComponent } from './User/login/login.component';
import { OrderComponent } from './order/order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { CollectionComponent } from './collection/form/collection.component';
import { LayoutComponent } from './layout/layout.component';
import { ImageLibraryComponent } from './components/form-component/image/image-library/image-library.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'files', component: ImageLibraryComponent, canActivate: [AuthGuard] },
  { path: 'reset', component: ResetPasswordComponent },
  {
    path: 'collection',
    component: CollectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
