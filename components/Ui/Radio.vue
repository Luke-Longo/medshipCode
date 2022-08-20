<template>
	<div class="flex justify-center gap-6">
		<label
			v-for="radioType in radioTypes"
			:key="radioType.id"
			class="cursor-pointer dark:hover:bg-darkBg hover:bg-darkSecondary rounded-lg p-2 trans"
			:class="{ selected: radioType.id === modelValue }"
			@click="handleUpdate(radioType.id)"
			>{{ radioType.label }}
		</label>
	</div>
</template>

<script setup lang="ts">
interface RadioType {
	id: string;
	label: string;
}
interface Props {
	radioTypes: RadioType[];
	modelValue: string;
}
const emit = defineEmits<{
	(e: "update:modelValue", value: string): void;
}>();
const props = defineProps<Props>();

const handleUpdate = (type: string) => {
	emit("update:modelValue", type);
};
</script>

<style scoped>
.selected {
	@apply dark:bg-darkBg bg-secondary text-white;
}
</style>
