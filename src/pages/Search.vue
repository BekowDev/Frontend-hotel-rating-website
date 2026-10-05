<template>
    <section class="h-full">
        <div class="container">
            <div class="h-full flex flex-col gap-5 sm:items-center pb-4">
                <ItemSearch />
                <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                    <TransitionGroup name="transition">
                        <Item-Hotel v-for="hotel in allHotels"
                                    :key="hotel._id"
                                    :hotel="hotel" />
                    </TransitionGroup>
                </div>
                <PageButtons v-if="$store.state.searchModule.hotels.length != 0"
                             class="mt-auto" />
                <NotFound v-else />
            </div>
        </div>
    </section>
</template>
<script>
import { mapGetters } from "vuex";
import ItemHotel from "@/components/Search/ItemHotel.vue";
import ItemSearch from "@/components/Search/ItemSearch.vue";
import PageButtons from "@/components/Search/PageButtons.vue";
export default {
    computed: {
        ...mapGetters("searchModule", ["allHotels"]),

    },
    data() {
        return {};
    },
    created() {
        this.$store.dispatch("searchModule/getHotels");
    },
    components: { ItemHotel, ItemSearch, PageButtons },
};
</script>
<style scoped>
.transition {
    /* position: relative; */
    padding: 0;
}

.transition-move,
.transition-enter-active,
.transition-leave-active {
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.transition-enter-from {
    opacity: 0;
    transform: translate(0, 165px);
}

.transition-leave-to {
    opacity: 0;
    transform: translate(0, 165px);
}

.transition-leave-active {
    /* position: absolute; */
}

.item::-webkit-scrollbar {
    display: none;
}

.item {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
