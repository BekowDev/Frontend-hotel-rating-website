<template>
    <section>
        <div class="container h-[calc(100%-20%)]">
            <div class="h-full flex items-center justify-center">
                <form class="w-[350px] rounded-[12px] flex flex-col gap-4">
                    <h3 class="text-center font-extrabold text-2xl uppercase">
                        {{ account ? "Sign In" : "Sign Up" }}
                    </h3>
                    <!-- <v-input :placeholder="'Enter username'"
                             :type="'text'"
                             :modelValue="username"
                             @update:modelValue="updateUsername">Username</v-input> -->
                    <!-- <v-input :placeholder="'Enter password'"
                             :type="'password'"
                             :modelValue="password"
                             @update:modelValue="updatePassword">Password</v-input> -->


                    <div class="flex flex-col gap-1">
                        <label class="pl-3 font-medium text-[18px]">
                            Username
                        </label>
                        <div class="flex items-center w-full gap-3 relative">
                            <div
                                 class="flex flex-1 rounded-[12px] bg-[var(--fields-color)] gap-2 py-3 pl-3 pr-8 border-[1px]">
                                <input placeholder="Username"
                                       class="flex-1 bg-transparent outline-none"
                                       :value="$store.state.authModule.username"
                                       @input="updateUsername($event.target.value)" />
                            </div>
                            <div class="absolute right-0 mr-3"
                                 v-show="$store.state.authModule.username"
                                 @click="clearUsername">
                                <div class="w-4">
                                    <img src="@/assets/icons/x-dark.png"
                                         class="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="pl-3 font-medium text-[18px]">
                            Password
                        </label>
                        <div class="flex items-center w-full gap-3 relative">
                            <div
                                 class="flex flex-1 rounded-[12px] bg-[var(--fields-color)] gap-2 py-3 pl-3 pr-8 border-[1px]">
                                <input placeholder="Password"
                                       class="flex-1 bg-transparent outline-none"
                                       :value="$store.state.authModule.password"
                                       @input="updatePassword($event.target.value)" />
                            </div>
                            <div class="absolute right-0 mr-3"
                                 v-show="$store.state.authModule.password"
                                 @click="clearPassword">
                                <div class="w-4">
                                    <img src="@/assets/icons/x-dark.png"
                                         class="icon" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <v-button v-if="!account"
                              @click.prevent="signUp()">Sign Up</v-button>
                    <v-button v-else
                              @click.prevent="signIn()">Sign In</v-button>
                    <template v-if="account">
                        <div class="text-center text-sm text-gray-500">or</div>
                        <v-button type="button"
                                  @click="signInDemo">
                            Continue as demo guest
                        </v-button>
                        <p class="text-center text-xs text-gray-500">
                            Demo access lasts until this browser tab is closed.
                        </p>
                    </template>
                    <v-link @click="haveAccount">{{
                        account
                        ? "I don't have an account"
                        : "I already have an account"
                    }}</v-link>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    computed: {
        username() {
            return this.$store.state.authModule.username;
        },
        password() {
            return this.$store.state.authModule.password;
        },
    },
    data() {
        return {
            account: true,
        };
    },
    methods: {
        haveAccount() {
            this.account = !this.account;
        },
        updateUsername(value) {
            this.$store.commit('authModule/setUsername', value);
        },
        updatePassword(value) {
            this.$store.commit('authModule/setPassword', value);
        },
        clearUsername() {
            this.$store.commit('authModule/setUsername', "");
        },
        clearPassword() {
            this.$store.commit('authModule/setPassword', "");
        },

        async signIn() {
            await this.$store.dispatch('authModule/signIn')
        },
        async signInDemo() {
            await this.$store.dispatch("authModule/demoSignIn");
            this.$router.push("/");
        },
        async signUp() {
            await this.$store.dispatch('authModule/signUp')
        }
    },
};
</script>
<style scoped></style>
