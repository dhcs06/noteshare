import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteshareComponent } from './noteshare.component';

describe('NoteshareComponent', () => {
  let component: NoteshareComponent;
  let fixture: ComponentFixture<NoteshareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteshareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
