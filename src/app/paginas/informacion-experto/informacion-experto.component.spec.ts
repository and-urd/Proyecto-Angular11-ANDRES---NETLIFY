import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionExpertoComponent } from './informacion-experto.component';

describe('InformacionExpertoComponent', () => {
  let component: InformacionExpertoComponent;
  let fixture: ComponentFixture<InformacionExpertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionExpertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
