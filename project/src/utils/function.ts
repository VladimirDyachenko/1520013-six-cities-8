export const floorRating = (rating: number): number => {
  if (rating % 1 === 0) {
    return rating;
  }

  return rating % 1 < 0.5 ? Math.floor(rating) : Math.ceil(rating);
};
