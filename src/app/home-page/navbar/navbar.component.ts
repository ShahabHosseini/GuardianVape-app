import { Component, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/User/user.service';
import { TransactionService } from 'src/app/base/transaction.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  public showButtons = false;

  constructor(
    private service: UserService,
    private tService: TransactionService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    //#endregio
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeUrl = event.urlAfterRedirects;
        this.showButtons = !(
          routeUrl === '/' ||
          routeUrl.endsWith('list') ||
          routeUrl === '/dashboard'
        );
      }
    });
  }

  signOut() {
    this.service.signOut();
  }

  saveChanges() {
    this.tService.triggerSaveClicked();
  }

  discardChanges() {
    this.tService.triggerDiscardClicked();
  }
}
