import { Component } from '@angular/core';

interface PlaceCard {
  city: string;
  score: number;
  reviews: number;
  tag: string;
  image: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  popularPlaces: PlaceCard[] = [
    {
      city: 'Rabat',
      score: 4.8,
      reviews: 320,
      tag: 'Culture',
      image: 'https://images.unsplash.com/photo-1653803363717-572fef95c0d9?auto=format&fit=crop&w=900&q=80'
    },
    {
      city: 'Marrakech',
      score: 4.7,
      reviews: 280,
      tag: 'Nature',
      image: 'https://images.unsplash.com/photo-1597212720410-c7b4d26adf2c?auto=format&fit=crop&w=900&q=80'
    },
    {
      city: 'Chefchaouen',
      score: 4.9,
      reviews: 410,
      tag: 'Decouverte',
      image: 'https://images.unsplash.com/photo-1579515302320-9f2f2f5a5f03?auto=format&fit=crop&w=900&q=80'
    },
    {
      city: 'Agadir',
      score: 4.6,
      reviews: 260,
      tag: 'Plage',
      image: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?auto=format&fit=crop&w=900&q=80'
    }
  ];

  constructor() {}

}
