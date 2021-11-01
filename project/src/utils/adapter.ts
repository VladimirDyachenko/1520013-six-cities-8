import { HotelRes } from '../types/api-response';
import { Offer } from '../types/offer';

export class APIAdapter {
  static offersToClient(hotel: HotelRes): Offer {
    return {
      bedrooms: hotel.bedrooms,
      city: {
        name: hotel.city.name,
        location: {
          latitude: hotel.city.location.latitude,
          longitude: hotel.city.location.longitude,
          zoom: hotel.city.location.zoom,
        },
      },
      description: hotel.description,
      goods: [...hotel.goods],
      host: {
        id: hotel.host.id,
        avatarUrl: hotel.host.avatar_url,
        isPro: hotel.host.is_pro,
        name: hotel.host.name,
      },
      id: hotel.id,
      images: [...hotel.images],
      isFavorite: hotel.is_favorite,
      isPremium: hotel.is_premium,
      location: {
        latitude: hotel.location.latitude,
        longitude: hotel.location.longitude,
        zoom: hotel.location.zoom,
      },
      maxAdults: hotel.max_adults,
      previewImage: hotel.preview_image,
      price: hotel.price,
      rating: hotel.rating,
      title: hotel.title,
      type: hotel.type,
    };
  }
}
