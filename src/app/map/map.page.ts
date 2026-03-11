import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var L: any;

interface MapPlace {
  id: number;
  name: string;
  category: string;
  lat: number;
  lng: number;
  rating: number;
  distance: string;
  image: string;
  isOpen: boolean;
  isFavorite?: boolean;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: false,
})
export class MapPage implements OnInit, AfterViewInit {
  map: any;
  markers: any[] = [];
  userLocationMarker: any = null;
  selectedPlace: MapPlace | null = null;
  routeDestination: MapPlace | null = null;
  showRoute = false;
  mapEmbedUrl!: SafeResourceUrl;
  mapCenter = { lat: 34.0209, lng: -6.8416 }; // Rabat
  userLocation: { lat: number; lng: number } | null = null;
  searchQuery: string = '';
  showFilters: boolean = true;

  places: MapPlace[] = [
    {
      id: 1,
      name: 'Tour Hassan',
      category: 'Monuments',
      lat: 34.0234,
      lng: -6.8239,
      rating: 4.8,
      distance: '2.5 km',
      image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=400&q=80',
      isOpen: true,
      isFavorite: false
    },
    {
      id: 2,
      name: 'Kasbah des Oudaias',
      category: 'Culture',
      lat: 34.0342,
      lng: -6.8387,
      rating: 4.7,
      distance: '3.2 km',
      image: 'https://images.unsplash.com/photo-1538252621117-e38a5749f295?auto=format&fit=crop&w=400&q=80',
      isOpen: true,
      isFavorite: true
    },
    {
      id: 3,
      name: 'Jardin d\'Essais',
      category: 'Nature',
      lat: 34.0185,
      lng: -6.8355,
      rating: 4.5,
      distance: '1.8 km',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80',
      isOpen: false,
      isFavorite: false
    },
    {
      id: 4,
      name: 'Médina de Rabat',
      category: 'Médina',
      lat: 34.0328,
      lng: -6.8331,
      rating: 4.6,
      distance: '2.1 km',
      image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=400&q=80',
      isOpen: true,
      isFavorite: false
    },
    {
      id: 5,
      name: 'Plage de Rabat',
      category: 'Plage',
      lat: 34.0150,
      lng: -6.8500,
      rating: 4.3,
      distance: '4.5 km',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      isOpen: true,
      isFavorite: false
    },
    {
      id: 6,
      name: 'Restaurant Le Dhow',
      category: 'Restaurants',
      lat: 34.0300,
      lng: -6.8400,
      rating: 4.7,
      distance: '2.8 km',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
      isOpen: true,
      isFavorite: true
    }
  ];

  filterOptions = ['Tous', 'Monuments', 'Culture', 'Nature', 'Plage', 'Restaurants'];
  selectedFilter = 'Tous';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.updateMapEmbedToDefault();
  }

  ngAfterViewInit() {
    // L'affichage cartographique est maintenant géré via un iframe Google Maps.
    // On garde uniquement la récupération de position pour les actions utilisateur.
    this.getUserLocation();
  }

  initMap() {
    const mapElement = document.getElementById('google-map');
    
    console.log('Initialisation de la carte...');
    console.log('Leaflet disponible?', typeof L !== 'undefined');
    console.log('Element map trouvé?', !!mapElement);
    
    if (typeof L !== 'undefined' && mapElement) {
      try {
        // Initialiser la carte Leaflet avec OpenStreetMap (gratuit)
        this.map = L.map('google-map', {
          center: [this.mapCenter.lat, this.mapCenter.lng],
          zoom: 13,
          zoomControl: true,
          attributionControl: true
        });

        // Ajouter les tuiles OpenStreetMap (gratuit, sans clé API)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
          minZoom: 3
        }).addTo(this.map);

        console.log('Carte initialisée avec succès!');

        // Forcer le redimensionnement après l'initialisation
        setTimeout(() => {
          if (this.map) {
            this.map.invalidateSize();
          }
        }, 300);

        this.addMarkers();
        this.getUserLocation(); // Géolocaliser l'utilisateur automatiquement
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de la carte:', error);
      }
    } else {
      console.warn('Leaflet not loaded yet or map element not found, retrying...');
      setTimeout(() => this.initMap(), 1000);
    }
  }

  addMarkers() {
    // Icône personnalisée pour les lieux
    const placeIcon = L.divIcon({
      html: `
        <svg width="32" height="40" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7 0 0 7 0 16c0 12 16 24 16 24s16-12 16-24C32 7 25 0 16 0z" fill="#3b82f6"/>
          <circle cx="16" cy="14" r="6" fill="white"/>
        </svg>
      `,
      className: 'custom-marker',
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40]
    });

    this.places.forEach(place => {
      const marker = L.marker([place.lat, place.lng], { icon: placeIcon })
        .addTo(this.map)
        .bindPopup(`<b>${place.name}</b><br>${place.category}`);

      marker.on('click', () => {
        this.selectPlace(place);
        this.map.panTo([place.lat, place.lng]);
      });

      this.markers.push(marker);
    });
  }

  selectPlace(place: MapPlace) {
    this.selectedPlace = place;
  }

  closeInfo() {
    this.selectedPlace = null;
  }

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
    this.filterMarkers();
  }

  filterMarkers() {
    if (!this.map || this.markers.length === 0) {
      return;
    }

    const filteredPlaces = this.getFilteredPlaces();
    
    this.markers.forEach((marker, index) => {
      const place = this.places[index];
      if (filteredPlaces.includes(place)) {
        marker.addTo(this.map);
      } else {
        this.map.removeLayer(marker);
      }
    });
  }

  getFilteredPlaces(): MapPlace[] {
    let filtered = this.places;

    // Filter by category
    if (this.selectedFilter !== 'Tous') {
      filtered = filtered.filter(p => p.category === this.selectedFilter);
    }

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  centerOnPlace(place: MapPlace) {
    if (this.map) {
      this.map.setView([place.lat, place.lng], 15);
    }
    this.selectPlace(place);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // Centrer la carte sur la position de l'utilisateur
          if (this.map) {
            this.map.setView([this.userLocation.lat, this.userLocation.lng], 14);
          }
          
          // Afficher le marqueur de l'utilisateur
          this.showUserLocationMarker();
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          // Si erreur, utiliser la position par défaut (Rabat)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  }

  showUserLocationMarker() {
    if (!this.userLocation || !this.map) return;

    // Supprimer l'ancien marqueur s'il existe
    if (this.userLocationMarker) {
      this.map.removeLayer(this.userLocationMarker);
    }

    // Créer un marqueur personnalisé pour l'utilisateur avec un cercle bleu
    const userIcon = L.divIcon({
      html: `
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="#4285F4" stroke="white" stroke-width="3"/>
          <circle cx="20" cy="20" r="8" fill="white"/>
        </svg>
      `,
      className: 'user-location-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    this.userLocationMarker = L.marker(
      [this.userLocation.lat, this.userLocation.lng],
      { icon: userIcon }
    ).addTo(this.map).bindPopup('Votre position');

    // Ajouter un cercle de précision autour de la position
    L.circle([this.userLocation.lat, this.userLocation.lng], {
      color: '#4285F4',
      fillColor: '#4285F4',
      fillOpacity: 0.1,
      radius: 100 // 100 mètres de rayon
    }).addTo(this.map);
  }

  centerToMyLocation() {
    if (this.userLocation && this.map) {
      // Si on a déjà la position, juste centrer
      this.map.setView([this.userLocation.lat, this.userLocation.lng], 15);
    } else {
      // Sinon, demander la géolocalisation
      this.getUserLocation();
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onSearch() {
    this.filterMarkers();
  }

  getDirections(place: MapPlace) {
    const origin = this.userLocation
      ? `${this.userLocation.lat},${this.userLocation.lng}`
      : `${this.mapCenter.lat},${this.mapCenter.lng}`;
    const destination = `${place.lat},${place.lng}`;
    const url = `https://www.google.com/maps?saddr=${origin}&daddr=${destination}&output=embed`;

    this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.routeDestination = place;
    this.showRoute = true;
  }

  closeRoute() {
    this.showRoute = false;
    this.routeDestination = null;
    this.updateMapEmbedToDefault();
  }

  private updateMapEmbedToDefault() {
    const url = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12118.064856609753!2d-6.8672676500000005!3d33.9506959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sfr!2sma!4v1773222131654!5m2!1sfr!2sma`;
    this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  callPlace(place: MapPlace) {
    // TODO: Implement call functionality
    console.log('Call place:', place.name);
  }

  toggleFavorite(place: MapPlace) {
    place.isFavorite = !place.isFavorite;
    console.log('Toggle favorite:', place.name, place.isFavorite);
  }
}
