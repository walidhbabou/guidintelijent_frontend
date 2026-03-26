import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FavorisPage } from './favoris.page';

describe('FavorisPage', () => {
  let component: FavorisPage;
  let fixture: ComponentFixture<FavorisPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavorisPage],
      imports: [CommonModule, FormsModule, IonicModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavorisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
