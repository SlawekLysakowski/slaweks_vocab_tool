import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabCreateComponent } from './vocab-create.component';

describe('VocabCreateComponent', () => {
  let component: VocabCreateComponent;
  let fixture: ComponentFixture<VocabCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VocabCreateComponent]
    });
    fixture = TestBed.createComponent(VocabCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
