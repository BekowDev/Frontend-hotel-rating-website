const demoReviewsKey = (hotelId) => `demoReviews:${hotelId}`;

export function getDemoReviews(hotel) {
    const savedReviews = localStorage.getItem(demoReviewsKey(hotel._id));
    if (!savedReviews) return hotel.rates;

    try {
        const reviews = JSON.parse(savedReviews);
        if (Array.isArray(reviews)) return reviews;
        console.error("Saved demo reviews are not a valid list.");
    } catch (error) {
        console.error("Could not read saved demo reviews:", error);
    }

    return hotel.rates;
}

export function saveDemoReviews(hotelId, reviews) {
    localStorage.setItem(demoReviewsKey(hotelId), JSON.stringify(reviews));
}
