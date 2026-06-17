<script lang="ts">
	import { replaceState } from '$app/navigation';
	import { untrack } from 'svelte';
	import { adventures } from '$lib/data/adventures';

	let { onclose, initialAdventureId = '' }: { onclose: () => void; initialAdventureId?: string } = $props();

	const initialIndex = untrack(() => initialAdventureId ? adventures.findIndex(a => a.id === initialAdventureId) : -1);
	let index = $state(initialIndex);

	const adventure = $derived(index >= 0 ? adventures[index] : null);

	$effect(() => {
		const id = index >= 0 ? adventures[index].id : null;
		replaceState(id ? `/adventures/${id}` : '/adventures', { openWindow: 'adventures' });
	});

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft' && index > -1) { index--; e.preventDefault(); }
		else if (e.key === 'ArrowRight' && index < adventures.length - 1) { index++; e.preventDefault(); }
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div class="adventures">
	<div class="nav">
		<button class="nav-btn" onclick={onclose}>back</button>
		<button class="nav-btn" onclick={() => index--} disabled={index === -1}>← prev</button>
		<span class="counter">{index === -1 ? '✦' : `${index + 1} / ${adventures.length}`}</span>
		<button class="nav-btn" onclick={() => index++} disabled={index === adventures.length - 1}>next →</button>
	</div>

	<div class="topbar">
		{#if adventure}
			<h2 class="title">{adventure.title}</h2>
			<span class="date">{adventure.date}</span>
		{:else}
			<h2 class="title">adventures</h2>
		{/if}
	</div>

	<div class="content">
		{#if adventure}
			<img src={adventure.image} alt={adventure.title} class="photo" />
			<p class="description">{adventure.description}</p>
		{:else}
			<p class="cover-text">these are the adventures i've gone on</p>
		{/if}
	</div>
</div>

<style>
	.adventures {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
	}

	.topbar {
		flex-shrink: 0;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.4rem 0.75rem;
		border-bottom: 1px solid rgba(0,0,0,0.2);
	}

	.title {
		font-size: 1.2rem;
		margin: 0;
	}

	.date {
		font-size: 0.75rem;
		background: rgba(0,0,0,0.08);
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		white-space: nowrap;
	}

	.content {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		display: flex;
		flex-direction: row;
		gap: 0.75rem;
		padding: 0.6rem 0.75rem 1.5rem;
		align-items: flex-start;
	}

	.description {
		flex: 1;
		min-width: 0;
		font-size: 0.95rem;
		line-height: 1.65;
		margin: 0;
	}

	.photo {
		width: 55%;
		flex-shrink: 0;
		object-fit: contain;
		display: block;
	}

	.nav {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.4rem 0.75rem;
		border-bottom: 1px solid rgba(0,0,0,0.2);
	}

	.nav-btn {
		background: none;
		border: 1px solid black;
		padding: 0.2rem 0.6rem;
		cursor: pointer;
		font-size: 0.78rem;
	}

	.nav-btn:hover:not(:disabled) {
		background: black;
		color: white;
	}

	.nav-btn:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.counter {
		font-size: 0.75rem;
		opacity: 0.6;
	}

	.cover-text {
		font-size: 1.1rem;
		line-height: 1.65;
		margin: 0;
	}
</style>
