import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsgeComponent } from './image.component';

describe('ImsgeComponent', () => {
  let component: ImsgeComponent;
  let fixture: ComponentFixture<ImsgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImsgeComponent],
    });
    fixture = TestBed.createComponent(ImsgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
