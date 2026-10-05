import { AuthAPI } from "@/api/authAPI";
export const authModule = {
    namespaced: true,
    state: () => ({
        token: localStorage.getItem("token") || null,
        authorized: localStorage.hasOwnProperty("token") || false,

        name: localStorage.getItem("name") || "",

        username: "",
        password: "",
    }),
    mutations: {
        setName(state, name) {
            state.name = name;
            localStorage.setItem("name", name);
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        setUsername(state, value) {
            state.username = value;
        },
        setPassword(state, value) {
            state.password = value;
        },
    },
    actions: {
        async signUp({ state }) {
            try {
                const res = await AuthAPI.signUp({
                    username: state.username,
                    password: state.password,
                });
                alert(res.data.message);
                window.location.href = "/login";
            } catch (error) {
                console.error("POST request Error:", error);
            }
        },
        async signIn({ commit, state }) {
            try {
                const res = await AuthAPI.signIn({
                    username: state.username,
                    password: state.password,
                });
                commit("setToken", res.data.token);
                commit("setName", res.data.username);
                window.location.href = "/";
            } catch (error) {
                console.error("POST request Error:", error);
            }
        },
        async deleteAccount({ commit }) {
            try {
                const res = await AuthAPI.deleteAccount();
                if (res) {
                    alert(res.data.message);
                    localStorage.clear();
                    location.reload();
                }
            } catch (error) {
                console.error("POST request Error:", error);
            }
        },
    },
};
