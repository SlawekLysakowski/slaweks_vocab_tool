import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabListComponent } from './vocab-list.component';

describe('VocabListComponent', () => {
  let component: VocabListComponent;
  let fixture: ComponentFixture<VocabListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VocabListComponent]
    });
    fixture = TestBed.createComponent(VocabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
