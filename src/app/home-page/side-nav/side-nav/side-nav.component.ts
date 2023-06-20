import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/User/user-store.service';
import { UserService } from 'src/app/User/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SidebarComponent implements OnInit {
  isSidebarOpen: boolean = false;
  openSubMenus: string[] = [];
  isMobileMode: boolean = false;
  activeItem: string = '';
  activeSubMenu: string = '';
  public fullName: string = '';

  constructor(
    private storreService: UserStoreService,
    private service: UserService
  ) {}
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit(): void {
    this.checkMobileMode();
    this.storreService.getFullNameFromStore().subscribe((x) => {
      let fullNameFromToken = this.service.getfullNameFromToken();
      this.fullName = x || fullNameFromToken;
    });
  }

  toggleSubMenu(submenu: string): void {
    // this.setActiveItem(submenu);
    if (this.openSubMenus.includes(submenu)) {
      this.openSubMenus = this.openSubMenus.filter((item) => item !== submenu);
    } else {
      this.openSubMenus.push(submenu);
    }
  }

  isSubMenuOpen(submenu: string): boolean {
    return this.openSubMenus.includes(submenu);
  }

  setActiveItem(item: string): void {
    this.activeItem = '';
    if (this.activeItem === item) {
      this.activeItem = ''; // Clear the active item if it's clicked again
    } else {
      this.activeItem = item;
    }
    this.activeSubMenu = ''; // Clear the active sub-menu as well
  }

  setActiveSubMenu(submenu: string): void {
    this.setActiveItem(submenu);
    if (this.activeSubMenu === submenu) {
      this.activeSubMenu = ''; // Clear the active sub-menu if it's clicked again
    } else {
      this.activeSubMenu = submenu;
    }
  }

  isActiveItem(item: string): boolean {
    return this.activeItem === item;
  }

  isActiveSubMenu(submenu: string): boolean {
    return this.activeSubMenu === submenu;
  }

  private checkMobileMode(): void {
    this.isMobileMode = window.innerWidth <= 767;
    this.isSidebarOpen = !this.isMobileMode;
  }
}
