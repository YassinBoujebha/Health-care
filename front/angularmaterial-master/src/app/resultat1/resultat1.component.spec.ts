import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resultat1Component } from './resultat1.component';

describe('Resultat1Component', () => {
  let component: Resultat1Component;
  let fixture: ComponentFixture<Resultat1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Resultat1Component]
    });
    fixture = TestBed.createComponent(Resultat1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
