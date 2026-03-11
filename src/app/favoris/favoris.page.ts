import { Component } from '@angular/core';

interface FavoriteItem {
  id: number;
  name: string;
  location: string;
  category: string;
  image: string;
  rating: number;
  isLiked: boolean;
}

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
  standalone: false,
})
export class FavorisPage {

  favorites: FavoriteItem[] = [
    {
      id: 1,
      name: 'Zoo de Rabat',
      location: 'Rabat, Maroc',
      category: 'Nature',
      image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=900&q=80',
      rating: 4.7,
      isLiked: true
    },
    {
      id: 2,
      name: 'Tour Hassan',
      location: 'Rabat, Maroc',
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1653803363717-572fef95c0d9?auto=format&fit=crop&w=900&q=80',
      rating: 4.9,
      isLiked: true
    },
    {
      id: 3,
      name: 'Chefchaouen Medina',
      location: 'Chefchaouen, Maroc',
      category: 'Découverte',
      image: 'https://images.unsplash.com/photo-1579515302320-9f2f2f5a5f03?auto=format&fit=crop&w=900&q=80',
      rating: 4.8,
      isLiked: true
    },
    {
      id: 4,
      name: 'Plage Agadir',
      location: 'Agadir, Maroc',
      category: 'Plage',
      image: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?auto=format&fit=crop&w=900&q=80',
      rating: 4.6,
      isLiked: true
    },
    {
      id: 5,
      name: 'Jardin Majorelle',
      location: 'Marrakech, Maroc',
      category: 'Nature',
      image: 'https://images.unsplash.com/photo-1597212720410-c7b4d26adf2c?auto=format&fit=crop&w=900&q=80',
      rating: 4.9,
      isLiked: true
    }
  ];

  categories = ['Tous', 'Nature', 'Culture', 'Plage', 'Découverte'];
  selectedCategory = 'Tous';

  constructor() {}

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  toggleLike(item: FavoriteItem) {
    item.isLiked = !item.isLiked;
  }

  getFilteredFavorites() {
    if (this.selectedCategory === 'Tous') {
      return this.favorites;
    }
    return this.favorites.filter(fav => fav.category === this.selectedCategory);
  }
}
