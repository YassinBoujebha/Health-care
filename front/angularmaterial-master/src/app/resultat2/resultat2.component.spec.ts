import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resultat2Component } from './resultat2.component';

describe('Resultat2Component', () => {
  let component: Resultat2Component;
  let fixture: ComponentFixture<Resultat2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Resultat2Component]
    });
    fixture = TestBed.createComponent(Resultat2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
