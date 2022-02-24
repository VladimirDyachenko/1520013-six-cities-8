import { AuthInfoRes, CommentGetRes, HotelRes } from '../types/api-response';
import { PrivateAuthInfo } from '../types/auth-info';
import { Comment } from '../types/comment';
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
        avatarUrl: hotel.host.avatarUrl,
        isPro: hotel.host.isPro,
        name: hotel.host.name,
      },
      id: hotel.id,
      images: [...hotel.images],
      isFavorite: hotel.isFavorite,
      isPremium: hotel.isPremium,
      location: {
        latitude: hotel.location.latitude,
        longitude: hotel.location.longitude,
        zoom: hotel.location.zoom,
      },
      maxAdults: hotel.maxAdults,
      previewImage: hotel.previewImage,
      price: hotel.price,
      rating: hotel.rating,
      title: hotel.title,
      type: hotel.type,
    };
  }

  static authInfoToClient(authInfo: AuthInfoRes): PrivateAuthInfo {
    return {
      avatarUrl: authInfo.avatarUrl,
      id: authInfo.id,
      isPro: authInfo.isPro,
      name: authInfo.name,
      email: authInfo.email,
      token: authInfo.token,
    };
  }

  static commentToClient(comment: CommentGetRes): Comment {
    return {
      comment: comment.comment,
      date: comment.date,
      id: comment.id,
      rating: comment.rating,
      user: {
        avatarUrl: comment.user.avatarUrl,
        id: comment.user.id,
        isPro: comment.user.isPro,
        name: comment.user.name,
      },
    };
  }
}
