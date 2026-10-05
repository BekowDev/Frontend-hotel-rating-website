import { AuthAPI } from "@/api/authAPI";
export const authModule = {
    namespaced: true,
    state: () => ({
        token: localStorage.getItem("token") || sessionStorage.getItem("demoToken") || null,
        authorized:
            localStorage.hasOwnProperty("token") ||
            sessionStorage.getItem("demoAccount") === "true",
        demoAccount: sessionStorage.getItem("demoAccount") === "true",

        name: sessionStorage.getItem("demoName") || localStorage.getItem("name") || "",

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
        setDemoAccount(state) {
            state.token = "demo-session";
            state.authorized = true;
            state.demoAccount = true;
            state.name = "Demo Guest";
            sessionStorage.setItem("demoToken", state.token);
            sessionStorage.setItem("demoAccount", "true");
            sessionStorage.setItem("demoName", state.name);
        },
        clearSession(state) {
            state.token = null;
            state.authorized = false;
            state.demoAccount = false;
            state.name = "";
            sessionStorage.removeItem("demoToken");
            sessionStorage.removeItem("demoAccount");
            sessionStorage.removeItem("demoName");
            localStorage.removeItem("token");
            localStorage.removeItem("name");
        },
    },
    actions: {
        demoSignIn({ commit }) {
            commit("setDemoAccount");
        },
        signOut({ commit, state }) {
            if (state.demoAccount) {
                commit("clearSession");
                return;
            }

            localStorage.clear();
            sessionStorage.clear();
            commit("clearSession");
        },
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
