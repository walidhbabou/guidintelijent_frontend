import { Component } from '@angular/core';

interface SearchResult {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  distance: string;
  image: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false,
})
export class SearchPage {
  searchQuery: string = '';
  selectedCategory: string = 'Tous';
  
  categories = ['Tous', 'Culture', 'Nature', 'Plage', 'Médina', 'Restaurants', 'Monuments'];

  searchResults: SearchResult[] = [
    {
      id: 1,
      name: 'Tour Hassan',
      category: 'Monuments',
      location: 'Rabat',
      rating: 4.8,
      distance: '2.5 km',
      image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=600&q=80',
      isOpen: true
    },
    {
      id: 2,
      name: 'Kasbah des Oudaias',
      category: 'Culture',
      location: 'Rabat',
      rating: 4.7,
      distance: '3.2 km',
      image: 'https://images.unsplash.com/photo-1538252621117-e38a5749f295?auto=format&fit=crop&w=600&q=80',
      isOpen: true
    },
    {
      id: 3,
      name: 'Jardin d\'Essais Botaniques',
      category: 'Nature',
      location: 'Rabat',
      rating: 4.5,
      distance: '1.8 km',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
      isOpen: false
    },
    {
      id: 4,
      name: 'Médina de Rabat',
      category: 'Médina',
      location: 'Rabat',
      rating: 4.6,
      distance: '2.1 km',
      image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=600&q=80',
      isOpen: true
    },
    {
      id: 5,
      name: 'Plage de Rabat',
      category: 'Plage',
      location: 'Rabat',
      rating: 4.3,
      distance: '5.0 km',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80',
      isOpen: true
    }
  ];

  recentSearches = [
    'Tour Hassan',
    'Chellah',
    'Restaurants médina',
    'Mosquée Hassan II'
  ];

  trendingSearches = [
    'Jardins exotiques',
    'Musées Rabat',
    'Excursions nature',
    'Gastronomie locale'
  ];

  constructor() {}

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  getFilteredResults() {
    if (this.selectedCategory === 'Tous') {
      return this.searchResults;
    }
    return this.searchResults.filter(item => item.category === this.selectedCategory);
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
  }

  clearSearch() {
    this.searchQuery = '';
  }

  removeRecentSearch(index: number) {
    this.recentSearches.splice(index, 1);
  }
}
