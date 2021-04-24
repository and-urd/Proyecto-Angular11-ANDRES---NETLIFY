import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoExpertoComponent } from './nuevo-experto.component';

describe('NuevoExpertoComponent', () => {
  let component: NuevoExpertoComponent;
  let fixture: ComponentFixture<NuevoExpertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoExpertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
