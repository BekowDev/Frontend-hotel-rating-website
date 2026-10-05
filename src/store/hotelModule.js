import { HotelAPI } from "@/api/hotelAPI";
import mockHotels from "@/data/mockHotels";
import { getDemoReviews } from "@/data/demoReviews";

export const hotelModule = {
    namespaced: true,
    state: () => ({
        id: "",
        hotel: {},
    }),
    getters: {
        hotel(state) {
            return state.hotel;
        },
    },
    mutations: {
        setId(state, id) {
            state.id = id;
        },
        setHotel(state, obj) {
            state.hotel = obj;
        },
    },
    actions: {
        async getHotel({ commit, state }) {
            const demoHotel = mockHotels.find((hotel) => hotel._id === state.id);
            if (demoHotel) {
                commit("setHotel", {
                    ...demoHotel,
                    rates: getDemoReviews(demoHotel),
                });
            }

            try {
                const res = await HotelAPI.getHotel({ id: state.id });
                if (res.data && Object.keys(res.data).length > 0) {
                    commit("setHotel", res.data);
                }
            } catch (error) {
                console.error("Hotel request failed; showing demo hotel:", error);
            }
        },
    },
};
