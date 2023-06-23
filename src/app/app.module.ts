import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SidebarComponent } from './home-page/side-nav/side-nav/side-nav.component';
import { OrderComponent } from './order/order.component';
import { CollectionComponent } from './collection/collection.component';
import { ProductComponent } from './product/product.component';
import { TagComponent } from './tag/tag.component';
import { NavbarComponent } from './home-page/navbar/navbar.component';
import { SignupComponent } from './User/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './User/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenInterceptor } from './api/interceptors/token.interceptor';
import { LayoutComponent } from './layout/layout.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { TitleDescriptionComponent } from './components/form-component/title-description/title-description.component';
import { ContentEditableDirective } from './components/helper/content-editable.directive';
import { RichTextboxComponent } from './components/form-component/rich-textbox/rich-textbox.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    OrderComponent,
    CollectionComponent,
    ProductComponent,
    TagComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    ResetPasswordComponent,
    TitleDescriptionComponent,
    ContentEditableDirective,
    RichTextboxComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      easing: 'ease-in',
      easeTime: 1000,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
