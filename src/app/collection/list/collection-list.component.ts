import { Component, OnInit } from '@angular/core';
import { CollectionDto } from 'src/app/Model/collection-dto';
import { CollectionService } from '../collection.service';
import { interval } from 'rxjs';
import { TitleDescriptionDto } from 'src/app/Model/title-description-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent implements OnInit {
  collections: TitleDescriptionDto[] = [];
  selectedCollections: TitleDescriptionDto[] = []; // Separate variable for the selection
  selectAllChecked = false;
  selectNext = true;

  selectedRows: boolean[] = [];
  metaKeySelection: boolean = false;

  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchCollectionsData();
    console.log('Collections : ', this.collections);
  }

  fetchCollectionsData() {
    this.collectionService.getCollections().subscribe(
      (data: CollectionDto[]) => {
        // Extract the titleDescription property from each CollectionDto element
        this.collections = data.map(
          (collection) => collection.titleDescription
        );
        this.collections.sort((a, b) => {
          // Compare the title properties of each object
          // The result of the comparison determines the order
          if (a.title > b.title) {
            return -1; // Put 'a' before 'b' (sort in descending order)
          } else if (a.title < b.title) {
            return 1; // Put 'b' before 'a'
          } else {
            return 0; // Keep the same order (for items with the same title)
          }
        });
        console.log(this.collections);
      },
      (error) => {
        console.log('Error fetching collections data:', error);
      }
    );
  }

  onRowSelect(event: any) {
    // Implement the edit logic here
    // You can access the selected row using the event argument
    const selectedCollection: TitleDescriptionDto = event;

    // Example: Display the selected collection data in the console
    console.log('Selected Collection:', this.selectedCollections);
    this.selectNext = false;
  }

  onRowUnselect(event: any) {
    const selectedCollection: TitleDescriptionDto = event;

    // Example: Display the selected collection data in the console
    console.log('Selected Collection:', this.selectedCollections);
    this.selectNext = false;
  }

  navigateToCollection() {
    // Implement the navigation logic here
    this.router.navigate(['/collection']);
  }
  rowClicked(event: any) {
    if (this.selectNext) {
      console.log('im here');
    } else {
      this.selectNext = true;
    }
  }
  selectAllRows(event: any) {
    console.log(event);
    // this.selectedCollections = event.checked ? [...this.collections] : [];
  }
  removeCollections() {}
}
