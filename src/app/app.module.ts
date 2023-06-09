import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatDividerModule} from '@angular/material/divider'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SidebarComponent } from './home-page/side-nav/side-nav/side-nav.component';
import { OrderComponent } from './order/order.component';
import { CollectionComponent } from './collection/collection.component';
import { ProductComponent } from './product/product.component';
import { TagComponent } from './tag/tag.component';
import { NavbarComponent } from './home-page/navbar/navbar.component';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    OrderComponent,
    CollectionComponent,
    ProductComponent,
    TagComponent,
    NavbarComponent
    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
   TooltipModule.forRoot(),
   AccordionModule.forRoot(),
   ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
