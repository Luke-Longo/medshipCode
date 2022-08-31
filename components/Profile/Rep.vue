<template>
	<div class="mx-4">
		<div class="grid grid-cols-4 sm:grid-cols-3" v-if="hasData">
			<p v-for="key in salesRep">{{ key }} : {{ salesRep }}</p>
		</div>
		<div class="flex justify-center items-center mt-36" v-else>
			<p class="flex text-xl">
				Please contact an admin to setup your profile details
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useProfileStore } from "~~/stores/profile";
import { SalesRep } from "~~/types/types";

const profileStore = useProfileStore();

console.log(profileStore.profile);
console.log(profileStore.salesRep);

const hasData = ref(false);
if (!!profileStore.salesRep) {
	hasData.value = true;
}

// const salesRep: SalesRep = ref(profileStore.salesRep);
</script>
