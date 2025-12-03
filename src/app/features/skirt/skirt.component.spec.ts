import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkirtComponent } from './skirt.component';

describe('SkirtComponent', () => {
  let component: SkirtComponent;
  let fixture: ComponentFixture<SkirtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkirtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkirtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
