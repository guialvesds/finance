import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidnavCustomComponent } from './sidnav-custom.component';

describe('SidnavCustomComponent', () => {
  let component: SidnavCustomComponent;
  let fixture: ComponentFixture<SidnavCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidnavCustomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidnavCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
