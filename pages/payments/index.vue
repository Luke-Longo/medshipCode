<template>
	<div class="my-6">
		<h3 class="header">Payments</h3>
		<button @click="handleRoute">click me</button>
	</div>
</template>

<script setup lang="ts">
const router = useRouter();

const handleRoute = () => {
	router.push("/payments/test/89`y187gy2ey");
};
</script>
