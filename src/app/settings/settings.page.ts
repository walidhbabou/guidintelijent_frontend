import { Component } from '@angular/core';

interface SettingItem {
  icon: string;
  title: string;
  subtitle?: string;
  value?: boolean;
  type: 'toggle' | 'navigation' | 'action';
  color?: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage {
  
  accountSettings: SettingItem[] = [
    {
      icon: 'person-circle-outline',
      title: 'Informations personnelles',
      subtitle: 'Nom, email, téléphone',
      type: 'navigation',
      color: '#3d7be6'
    },
    {
      icon: 'lock-closed-outline',
      title: 'Sécurité et confidentialité',
      subtitle: 'Mot de passe, authentification',
      type: 'navigation',
      color: '#10b981'
    },
    {
      icon: 'card-outline',
      title: 'Paiement',
      subtitle: 'Gérer vos moyens de paiement',
      type: 'navigation',
      color: '#f59e0b'
    }
  ];

  appSettings: SettingItem[] = [
    {
      icon: 'notifications-outline',
      title: 'Notifications push',
      value: true,
      type: 'toggle',
      color: '#6366f1'
    },
    {
      icon: 'mail-outline',
      title: 'Notifications email',
      value: false,
      type: 'toggle',
      color: '#ec4899'
    },
    {
      icon: 'locate-outline',
      title: 'Géolocalisation',
      value: true,
      type: 'toggle',
      color: '#14b8a6'
    },
    {
      icon: 'download-outline',
      title: 'Téléchargement automatique',
      subtitle: 'Guides audio en wifi uniquement',
      value: true,
      type: 'toggle',
      color: '#8b5cf6'
    },
    {
      icon: 'moon-outline',
      title: 'Mode sombre',
      value: false,
      type: 'toggle',
      color: '#64748b'
    }
  ];

  otherSettings: SettingItem[] = [
    {
      icon: 'language-outline',
      title: 'Langue',
      subtitle: 'Français',
      type: 'navigation',
      color: '#06b6d4'
    },
    {
      icon: 'help-circle-outline',
      title: 'Aide et support',
      type: 'navigation',
      color: '#10b981'
    },
    {
      icon: 'information-circle-outline',
      title: 'À propos',
      subtitle: 'Version 1.0.0',
      type: 'navigation',
      color: '#3d7be6'
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Conditions d\'utilisation',
      type: 'navigation',
      color: '#8b5cf6'
    },
    {
      icon: 'document-text-outline',
      title: 'Politique de confidentialité',
      type: 'navigation',
      color: '#ec4899'
    }
  ];

  dangerSettings: SettingItem[] = [
    {
      icon: 'trash-outline',
      title: 'Effacer le cache',
      subtitle: '246 MB',
      type: 'action',
      color: '#f59e0b'
    },
    {
      icon: 'log-out-outline',
      title: 'Se déconnecter',
      type: 'action',
      color: '#ef4444'
    }
  ];

  constructor() {}

  onToggleChange(item: SettingItem) {
    console.log(`${item.title} changed to ${item.value}`);
  }

  onSettingClick(item: SettingItem) {
    console.log(`Clicked on ${item.title}`);
  }
}
