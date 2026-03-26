import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationsPage } from './notifications.page';

describe('NotificationsPage', () => {
  let component: NotificationsPage;
  let fixture: ComponentFixture<NotificationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsPage],
      imports: [CommonModule, FormsModule, IonicModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
