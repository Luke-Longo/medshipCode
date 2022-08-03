<template>
	<div class="flex flex-col items-center gap-6">
		<UiCard
			v-for="action in actionProps"
			class="hover:cursor-pointer group hover:bg-primary hover:text-white dark:hover:bg-darkPrimary my-0 trans"
		>
			<div class="" @click="handleAction(action.id)">
				<component
					class="text-4xl mt-2 mb-3 text-center justify-center items-center w-full"
					:is="action.icon"
				/>
				<p class="text-center dark:text-darkSecondary group-hover:text-white">
					{{ action.name }}
				</p>
			</div>
		</UiCard>
	</div>
</template>

<script setup lang="ts">
interface ActionIcon {
	name: string;
	render: () => {};
}
type ActionProps = {
	id: string;
	name: string;
	icon: ActionIcon;
};
const props = defineProps<{
	actionProps: ActionProps[];
}>();
const emits = defineEmits<{
	(e: string, action: string): void;
}>();
const searching = ref(false);

const router = useRouter();

const handleAction = async (action: string) => {
	if (action === props.actionProps[0].id) {
		console.log(props.actionProps[0].id);
		emits("actionClicked", props.actionProps[0].id);
		// router.push("/patients/add");
	} else if (action === props.actionProps[1]?.id) {
		console.log(props.actionProps[1]?.id);
		emits("actionClicked", props.actionProps[1].id);
	} else if (action === props.actionProps[2]?.id) {
		emits("actionClicked", props.actionProps[2].id);
		console.log(props.actionProps[2].id);
	} else if (action === props.actionProps[3]?.id) {
		console.log(props.actionProps[3].id);
		emits("actionClicked", props.actionProps[3].id);
	} else if (action === props.actionProps[4]?.id) {
		console.log(props.actionProps[4].id);
		emits("actionClicked", props.actionProps[4].id);
	}
};
</script>
