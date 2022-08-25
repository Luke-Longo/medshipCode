<template>
	<div class="dropdown" @mouseleave="toggleActive(false)">
		<div
			class="flex items-center hover:cursor-pointer dark:hover:text-darkPrimary trans"
			@click="toggleActive()"
		>
			Actions
			<i class="justify-center text-xl"><ChevronDown></ChevronDown></i>
		</div>
		<transition name="fade">
			<div class="dropdown-content" v-if="active">
				<div class="content" @click="bill(order.orderNumber)">Mark as Billed</div>
				<div class="content" @click="form1500">Download Form 1500</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import ChevronDown from "~icons/mdi/chevron-down";

const active = ref(false);

const toggleActive = (isActive?: boolean) => {
	if (isActive !== undefined) {
		active.value = isActive;
	} else {
		active.value = !active.value;
	}
};
</script>

<style scoped>
.dropdown {
	position: relative;
	display: inline-block;
	@apply trans;
}

.dropdown-content {
	display: none;
	position: absolute;
	min-width: 160px;
	z-index: 1;
	@apply dark:bg-black bg-white rounded-md flex flex-col py-2 shadow-md w-fit;
}
.content {
	@apply dark:hover:bg-darkBg hover:bg-darkSecondary p-3 trans hover:cursor-pointer;
}
</style>
