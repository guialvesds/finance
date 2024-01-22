import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAccessComponent } from './home-access.component';

describe('HomeAccessComponent', () => {
  let component: HomeAccessComponent;
  let fixture: ComponentFixture<HomeAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
