import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaExpertoComponent } from './linea-experto.component';

describe('LineaExpertoComponent', () => {
  let component: LineaExpertoComponent;
  let fixture: ComponentFixture<LineaExpertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineaExpertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
