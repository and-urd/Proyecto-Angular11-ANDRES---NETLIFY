import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaEtiquetaComponent } from './nueva-etiqueta.component';

describe('NuevaEtiquetaComponent', () => {
  let component: NuevaEtiquetaComponent;
  let fixture: ComponentFixture<NuevaEtiquetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaEtiquetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
