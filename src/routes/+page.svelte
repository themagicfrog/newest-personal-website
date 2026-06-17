<script lang="ts">
	import IntroSection from '$lib/components/IntroSection.svelte';
	import Scene from '$lib/components/Scene.svelte';

	let container = $state<HTMLElement>();

	function hscroll(node: HTMLElement) {
		function onwheel(e: WheelEvent) {
			e.preventDefault();
			node.scrollLeft += e.deltaY + e.deltaX;
		}
		node.addEventListener('wheel', onwheel, { passive: false });
		return { destroy() { node.removeEventListener('wheel', onwheel); } };
	}
</script>

<div class="hscroll" use:hscroll bind:this={container}>
	<IntroSection />
	<Scene />
</div>

<style>
	.hscroll {
		display: flex;
		flex-direction: row;
		width: 100vw;
		height: 100vh;
		overflow-x: scroll;
		overflow-y: hidden;
		scrollbar-width: none;
	}

	.hscroll::-webkit-scrollbar {
		display: none;
	}
</style>
