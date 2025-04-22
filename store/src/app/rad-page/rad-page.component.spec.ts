import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadPageComponent } from './rad-page.component';

describe('RadPageComponent', () => {
  let component: RadPageComponent;
  let fixture: ComponentFixture<RadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
