<template>
    <div class="flex flex-col">
        <v-button @click="toggleSort"
                  v-if="!$store.state.ratesModule.reviewed"
                  class="min-w-[200px]">
            <div class="flex justify-center items-center gap-1 overflow-hidden">
                Add a review
                <div class="text-3xl -my-3">
                    +
                </div>
            </div>
        </v-button>
        <v-button @click="deleteReview"
                  v-else
                  class="min-w-[200px]"
                  style="background: #d54f4f;">
            <div class="flex justify-center items-center gap-1 overflow-hidden ">
                Remove a review
            </div>
        </v-button>
        <div class="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-40 flex items-center justify-center"
             v-show="sortActive"
             @click="toggleSort">
            <div @click.stop
                 class="p-3 bg-white border-[1px] rounded-[12px] flex flex-col gap-4 w-full mx-5 sm:mx-0 sm:w-fit relative">
                <textarea type="text"
                          rows="10"
                          placeholder="Your Review here..."
                          maxlength="1000"
                          class="rounded-[12px] bg-[var(--fields-color)] border-[1px] outline-none p-3"
                          :value="$store.state.ratesModule.postData.text"
                          @input="$store.commit('ratesModule/setText', $event.target.value)" />
                <p v-if="$store.state.ratesModule.formError"
                   class="text-sm text-red-600">
                    {{ $store.state.ratesModule.formError }}
                </p>
                <div class="grid grid-flow-row gap-4 sm:grid-flow-col sm:justify-between">
                    <v-button style="font-weight: 100;">
                        <ItemStars />
                    </v-button>
                    <v-button @click="addReview"
                              style="padding: 12px 20px;">Leave a review</v-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ItemStars from './ItemStars.vue';
export default {
    components: {
        ItemStars
    },

    data() {
        return {
            sortActive: false,
        };
    },

    methods: {
        toggleSort() {
            this.sortActive = !this.sortActive;
            this.$store.commit("ratesModule/setFormError", "");
            document.body.style.overflow = this.sortActive
                ? "hidden"
                : "scroll";
        },

        async addReview() {
            const added = await this.$store.dispatch("ratesModule/addReview");
            if (!added) return;
            this.sortActive = false;
            document.body.style.overflow = "scroll";
            await this.$store.dispatch("ratesModule/getRates");
        },
        async deleteReview() {
            await this.$store.dispatch("ratesModule/deleteReview");
            await this.$store.dispatch("ratesModule/getRates");
        },
    },
    beforeUnmount() {
        document.body.style.overflow = "scroll";
    },
};
</script>
<style scoped>
button {
    padding: 8px 0;
    border-radius: 12px;
}
</style>
