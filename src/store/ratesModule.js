import { RatesAPI } from "@/api/ratesAPI";
import mockHotels from "@/data/mockHotels";
import { getDemoReviews, saveDemoReviews } from "@/data/demoReviews";

const currentUsername = () =>
    sessionStorage.getItem("demoName") || localStorage.getItem("name") || "Гость";

export const ratesModule = {
    namespaced: true,
    state: () => ({
        rates: [],
        totalPage: 1,
        reviewed: false,
        formError: "",
        getData: {
            id: "",
            sortBy: "addedDate",
            sortOrder: "desc",
            page: 1,
            limit: 8,
            search: "",
        },
        postData: {
            stars: 0,
            text: "",
        },
    }),
    getters: {
        allRates(state) {
            return state.rates;
        },
    },
    mutations: {
        setStar(state, value) {
            state.postData.stars = state.postData.stars == value ? 0 : value;
        },
        setHotelId(state, value) {
            state.postData.hotel_id = value;
        },
        setText(state, value) {
            state.postData.text = value;
        },
        setReviewed(state, value) {
            state.reviewed = value;
        },
        setFormError(state, value) {
            state.formError = value;
        },

        setId(state, id) {
            state.getData.id = id;
        },
        setRates(state, value) {
            state.rates = value;
        },
        setSortBy(state, value) {
            state.getData.sortBy = value;
        },
        setSortOrder(state, value) {
            state.getData.sortOrder = value;
        },
        setTotalPage(state, value) {
            state.totalPage = Math.ceil(value / state.getData.limit).toString();
        },

        nextPage(state) {
            state.getData.page += 1;
        },
        previousPage(state) {
            state.getData.page -= 1;
        },
    },
    actions: {
        async getRates({ commit, state }) {
            const hotel = mockHotels.find((item) => item._id === state.getData.id);
            const username = currentUsername();

            if (hotel) {
                const allReviews = getDemoReviews(hotel);
                const reviews = allReviews
                    .filter((rate) =>
                        rate.text.toLowerCase().includes(state.getData.search.toLowerCase())
                    )
                    .sort((first, second) => {
                        const comparison =
                            first[state.getData.sortBy] > second[state.getData.sortBy]
                                ? 1
                                : first[state.getData.sortBy] < second[state.getData.sortBy]
                                    ? -1
                                    : 0;
                        return state.getData.sortOrder === "desc" ? -comparison : comparison;
                    });
                const start = (state.getData.page - 1) * state.getData.limit;
                commit("setRates", reviews.slice(start, start + state.getData.limit));
                commit("setTotalPage", reviews.length);
                commit("setReviewed", allReviews.some(
                    (rate) => rate.username === username && rate.isDemoUserReview
                ));
                return;
            }

            try {
                const res = await RatesAPI.getRates(state.getData);
                if (Array.isArray(res.data.rates)) {
                    commit("setRates", res.data.rates);
                    commit("setTotalPage", res.data.totalPage);
                    commit("setReviewed", res.data.reviewed);
                }
            } catch (error) {
                console.error("Review request failed:", error);
            }
        },
        async addReview({ commit, state }) {
            const text = state.postData.text.trim();
            if (!text || state.postData.stars < 1 || state.postData.stars > 5) {
                commit("setFormError", "Напишите отзыв и выберите оценку от 1 до 5.");
                return false;
            }

            const hotel = mockHotels.find((item) => item._id === state.getData.id);
            const username = currentUsername();
            if (hotel) {
                const reviews = getDemoReviews(hotel);
                if (reviews.some((rate) => rate.username === username && rate.isDemoUserReview)) {
                    commit("setReviewed", true);
                    return false;
                }

                const review = {
                    _id: `demo-review-${Date.now()}`,
                    username,
                    stars: state.postData.stars,
                    addedDate: new Date().toISOString(),
                    text,
                    isDemoUserReview: true,
                };
                const updatedReviews = [review, ...reviews];
                saveDemoReviews(hotel._id, updatedReviews);
                commit("setText", "");
                commit("setStar", 0);
                commit("setFormError", "");
                commit("setReviewed", true);
                return true;
            }

            try {
                await RatesAPI.addReview({
                    username,
                    text,
                    hotel_id: state.getData.id,
                    stars: state.postData.stars,
                });
                commit("setReviewed", true);
                commit("setText", "");
                commit("setStar", 0);
                commit("setFormError", "");
                return true;
            } catch (error) {
                console.error("POST request Error:", error);
                commit("setFormError", "Не удалось отправить отзыв. Попробуйте ещё раз.");
                return false;
            }
        },
        async deleteReview({ commit, state }) {
            const hotel = mockHotels.find((item) => item._id === state.getData.id);
            if (hotel) {
                const username = currentUsername();
                const reviews = getDemoReviews(hotel).filter(
                    (rate) => !(rate.username === username && rate.isDemoUserReview)
                );
                saveDemoReviews(hotel._id, reviews);
                commit("setReviewed", false);
                return;
            }

            try {
                await RatesAPI.deleteReview({
                    hotel_id: state.getData.id,
                });
                commit("setReviewed", false);
            } catch (error) {
                console.error("POST request Error:", error);
            }
        },
    },
};
