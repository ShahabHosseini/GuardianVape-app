import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
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
import { CollectionComponent } from './collection/form/collection.component';
import { ProductComponent } from './product/product.component';
import { TagComponent } from './tag/tag.component';
import { NavbarComponent } from './home-page/navbar/navbar.component';
import { SignupComponent } from './User/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './User/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
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
import { NgxEditorModule } from 'ngx-editor';
import { CollectionTypeComponent } from './collection/collection-type/collection-type.component';
import { DropdownListModule } from 'ngx-dropdown-list';
import { SearchEngineComponent } from './components/search-engine/search-engine.component';
import { ImageComponent } from './components/form-component/image/image.component';
import { ConditionComponent } from './collection/condition/condition.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { GvDropdownComponent } from './components/form-component/gv-dropdown/gv-dropdown.component';
import { SimbolTextboxComponent } from './components/form-component/simbol-textbox/simbol-textbox.component';
import { DropdownModule } from 'primeng/dropdown';
import { ImageLibraryComponent } from './components/form-component/image/image-library/image-library.component';
import { EditImageComponent } from './components/form-component/image/edit-image/edit-image.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    OrderComponent,
    SimbolTextboxComponent,
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
    CollectionTypeComponent,
    SearchEngineComponent,
    ImageComponent,
    ConditionComponent,
    SimbolTextboxComponent,
    GvDropdownComponent,
    ImageLibraryComponent,
    EditImageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DropdownModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    DropdownListModule,
    MatDividerModule,
    SelectDropDownModule,
    CommonModule,
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),

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
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
