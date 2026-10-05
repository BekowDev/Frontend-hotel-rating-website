import { HotelAPI } from "../api/hotelAPI";
import mockHotels from "@/data/mockHotels";
import { getDemoReviews } from "@/data/demoReviews";

function getDemoHotels({ city, search, sortBy, sortOrder, page, limit }) {
    const matchingHotels = mockHotels
        .filter((hotel) => !city || hotel.city === city)
        .filter((hotel) =>
            `${hotel.name} ${hotel.type} ${hotel.address}`
                .toLowerCase()
                .includes((search || "").toLowerCase())
        )
        .sort((first, second) => {
            const firstValue = Number(first[sortBy]) || first[sortBy];
            const secondValue = Number(second[sortBy]) || second[sortBy];
            const comparison =
                typeof firstValue === "number"
                    ? firstValue - secondValue
                    : String(firstValue).localeCompare(String(secondValue));

            return sortOrder === "desc" ? -comparison : comparison;
        })
        .map((hotel) => ({ ...hotel, rates: getDemoReviews(hotel) }));
    const start = (Number(page) - 1) * Number(limit);

    return {
        hotels: matchingHotels.slice(start, start + Number(limit)),
        total: matchingHotels.length,
    };
}

export const searchModule = {
    namespaced: true,
    state: () => ({
        hotels: [],
        totalPage: 1,
        getData: {
            sortBy: "price",
            sortOrder: "desc",
            page: 1,
            limit: 8,
            search: "",
            city: "Almaty",
        },
    }),
    getters: {
        allHotels(state) {
            return state.hotels;
        },
    },
    mutations: {
        setHotels(state, value) {
            state.hotels = value;
        },
        setSearch(state, value) {
            state.getData.search = value;
        },
        setPage(state, value) {
            state.getData.page = Number(value?.value || value);
        },
        setCity(state, value) {
            state.getData.city = value;
        },
        clearSearch(state) {
            state.getData.search = "";
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
        async getHotels({ commit, state }) {
            const demo = getDemoHotels(state.getData);
            commit("setHotels", demo.hotels);
            commit("setTotalPage", demo.total);

            try {
                const res = await HotelAPI.getHotels(state.getData);
                if (Array.isArray(res.data.hotels) && res.data.hotels.length > 0) {
                    commit("setHotels", res.data.hotels);
                    commit("setTotalPage", res.data.totalPage);
                }
            } catch (error) {
                console.error("Hotel request failed; showing demo hotels:", error);
            }
        },
    },
};
