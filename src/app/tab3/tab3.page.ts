import { Component } from '@angular/core';

interface TripCard {
  title: string;
  subtitle: string;
  image: string;
}

interface NoticeItem {
  title: string;
  text: string;
  time: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  trips: TripCard[] = [
    {
      title: 'Chefchaouen Blue Walk',
      subtitle: 'Culture · 2h',
      image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Sunset in Agadir',
      subtitle: 'Plage · 1h 30',
      image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  notices: NoticeItem[] = [
    {
      title: 'Nouveau guide audio',
      text: 'Le parcours Medina est maintenant disponible hors ligne.',
      time: 'Il y a 10 min'
    },
    {
      title: 'Alerte meteo',
      text: 'Vent fort annonce sur la cote. Pensez a verifier vos trajets.',
      time: 'Il y a 1 h'
    }
  ];

  constructor() {}

}
