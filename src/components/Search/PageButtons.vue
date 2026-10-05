<template>
    <div class="w-full">
        <div class="flex gap-6 items-center justify-center">
            <v-button :disabled="$store.state.searchModule.getData.page == 1"
                      @click="
                          $store.commit('searchModule/previousPage'), $store.dispatch('searchModule/getHotels')
                          ">
                <div class="w-[15px] h-[15px]">
                    <img src="@/assets/icons/back2.png"
                         alt="search-icon"
                         class="icon" />
                </div>
            </v-button>

            <div class="flex gap-6 text-xl">
                <button v-for="page in +$store.state.searchModule.totalPage"
                        :key="page"
                        @click="$store.commit('searchModule/setPage', page), $store.dispatch('searchModule/getHotels')"
                        :style="$store.state.searchModule.getData.page == page
                            ? 'text-decoration: underline; font-weight: 700'
                            : false
                            "
                        class="text-[#5856d6]">
                    {{ page }}
                </button>
            </div>
            <v-button :disabled="$store.state.searchModule.getData.page >=
                $store.state.searchModule.totalPage
                "
                  @click="$store.commit('searchModule/nextPage'), $store.dispatch('searchModule/getHotels')">
                <div class="w-[15px] h-[15px]">
                    <img src="@/assets/icons/back2.png"
                         alt="search-icon"
                         class="icon rotate-180" />
                </div>
            </v-button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {},
};
</script>
<style scoped></style>
