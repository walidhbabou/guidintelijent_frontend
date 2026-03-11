import { Component } from '@angular/core';

interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning' | 'promo';
  title: string;
  message: string;
  time: string;
  icon: string;
  isRead: boolean;
  color: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: false,
})
export class NotificationsPage {

  notifications: Notification[] = [
    {
      id: 1,
      type: 'success',
      title: 'Nouveau guide audio disponible',
      message: 'Le parcours "Médina de Marrakech" est maintenant disponible en ligne et hors ligne.',
      time: 'Il y a 5 min',
      icon: 'headset',
      isRead: false,
      color: '#10b981'
    },
    {
      id: 2,
      type: 'promo',
      title: 'Offre spéciale',
      message: 'Bénéficiez de -30% sur tous les guides premium ce week-end !',
      time: 'Il y a 15 min',
      icon: 'pricetag',
      isRead: false,
      color: '#f59e0b'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Alerte météo',
      message: 'Vent fort annoncé sur la côte. Pensez à vérifier vos trajets.',
      time: 'Il y a 1 h',
      icon: 'warning',
      isRead: true,
      color: '#ef4444'
    },
    {
      id: 4,
      type: 'info',
      title: 'Nouveau lieu ajouté',
      message: 'Le Jardin Majorelle a été ajouté à votre liste de lieux recommandés.',
      time: 'Il y a 2 h',
      icon: 'location',
      isRead: true,
      color: '#3b82f6'
    },
    {
      id: 5,
      type: 'success',
      title: 'Visite complétée',
      message: 'Félicitations ! Vous avez complété la visite du Zoo de Rabat.',
      time: 'Il y a 5 h',
      icon: 'checkmark-circle',
      isRead: true,
      color: '#10b981'
    },
    {
      id: 6,
      type: 'info',
      title: 'Mise à jour disponible',
      message: 'Une nouvelle version de l\'application est disponible avec de nouvelles fonctionnalités.',
      time: 'Hier',
      icon: 'download',
      isRead: true,
      color: '#8b5cf6'
    }
  ];

  filter: 'all' | 'unread' = 'all';

  constructor() {}

  markAsRead(notification: Notification) {
    notification.isRead = true;
  }

  markAllAsRead() {
    this.notifications.forEach(notif => notif.isRead = true);
  }

  deleteNotification(id: number) {
    this.notifications = this.notifications.filter(notif => notif.id !== id);
  }

  getFilteredNotifications() {
    if (this.filter === 'unread') {
      return this.notifications.filter(notif => !notif.isRead);
    }
    return this.notifications;
  }

  getUnreadCount() {
    return this.notifications.filter(notif => !notif.isRead).length;
  }
}
