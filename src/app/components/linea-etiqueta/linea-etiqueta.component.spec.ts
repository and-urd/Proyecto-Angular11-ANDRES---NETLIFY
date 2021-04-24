import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaEtiquetaComponent } from './linea-etiqueta.component';

describe('LineaEtiquetaComponent', () => {
  let component: LineaEtiquetaComponent;
  let fixture: ComponentFixture<LineaEtiquetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineaEtiquetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
