import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbContainerComponent } from './cb-container.component';

describe('CbContainerComponent', () => {
  let component: CbContainerComponent;
  let fixture: ComponentFixture<CbContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CbContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
