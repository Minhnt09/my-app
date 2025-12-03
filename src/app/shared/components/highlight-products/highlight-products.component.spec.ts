import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightProductsComponent } from './highlight-products.component';


describe('HighlightProductsComponent', () => {
  let component: HighlightProductsComponent;
  let fixture: ComponentFixture<HighlightProductsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
