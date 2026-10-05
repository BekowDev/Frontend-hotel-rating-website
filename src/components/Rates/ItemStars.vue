<template>
    <div class="text-4xl mx-auto flex justify-center items-center w-full px-[20px]">
        <div v-for="i in 5"
             :key="i"
             role="button"
             :aria-label="`Оценка ${i} из 5`"
             class="cursor-pointer select-none"
             @click="$store.commit('ratesModule/setStar', i)">
            {{ $store.state.ratesModule.postData.stars >= i ? "★" : "☆" }}
        </div>
    </div>
</template>
<script>

export default {
}
</script>