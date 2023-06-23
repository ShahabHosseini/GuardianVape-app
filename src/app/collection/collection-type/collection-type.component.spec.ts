import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionTypeComponent } from './collection-type.component';

describe('CollectionTypeComponent', () => {
  let component: CollectionTypeComponent;
  let fixture: ComponentFixture<CollectionTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionTypeComponent]
    });
    fixture = TestBed.createComponent(CollectionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
