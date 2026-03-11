import { Component } from '@angular/core';

interface CommentItem {
  name: string;
  text: string;
  likes: number;
  image: string;
  stars: number;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  place = {
    name: 'Zoo de Rabat',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
    score: 4.7,
    reviews: 30,
    tag: 'Decouverte'
  };

  comments: CommentItem[] = [
    {
      name: 'Alex Martin',
      text: 'Super endroit. Les animaux sont bien soignes et l espace est vaste.',
      likes: 12,
      stars: 4,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80'
    },
    {
      name: 'Sophie Dubois',
      text: 'Ideal pour une sortie en famille, zone tres propre et bien organisee.',
      likes: 18,
      stars: 5,
      image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=240&q=80'
    }
  ];

  constructor() {}

}
