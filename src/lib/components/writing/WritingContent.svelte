<script lang="ts">
	import { pieces } from '$lib/data/writing';

	const { onclose }: { onclose: () => void } = $props();

	const spreads = Array.from({ length: Math.ceil(pieces.length / 2) }, (_, i) => pieces.slice(i * 2, i * 2 + 2));

	let spreadIndex = $state(0);
	const spread = $derived(spreads[spreadIndex]);

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft' && spreadIndex > 0) { spreadIndex--; e.preventDefault(); }
		else if (e.key === 'ArrowRight' && spreadIndex < spreads.length - 1) { spreadIndex++; e.preventDefault(); }
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div class="writing">
	<div class="nav">
		<button class="nav-btn" onclick={onclose}>back</button>
		<button class="nav-btn" onclick={() => spreadIndex--} disabled={spreadIndex === 0}>← prev</button>
		<button class="nav-btn" onclick={() => spreadIndex++} disabled={spreadIndex === spreads.length - 1}>next →</button>
	</div>

	<div class="spread">
		{#each spread as piece}
			<div class="page">
				<div class="piece-header">
					<a href={piece.link} target="_blank" rel="noopener" class="piece-title">{piece.title}</a>
					<span class="piece-date">{piece.date}</span>
				</div>
				{#each piece.awards as award}
					<p class="piece-award">{@html award}</p>
				{/each}
				<p class="piece-excerpt">{piece.excerpt}</p>
			</div>
		{/each}
		{#if spread.length < 2}
			<div class="page page--empty"></div>
		{/if}
	</div>

	<span class="page-number">{spreadIndex + 1} / {spreads.length}</span>
</div>

<style>
	.writing {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
	}

	.nav {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1.5rem 0.75rem 0.25rem;
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

.spread {
		flex: 1;
		display: flex;
		min-height: 0;
	}

	.page {
		flex: 1;
		padding: 0.75rem 2.5rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		overflow-y: auto;
	}

	.page + .page {
		border-left: 1px solid rgba(0,0,0,0.15);
	}

	.page--empty {
		background: rgba(0,0,0,0.02);
	}

	.piece-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
	}

	.piece-title {
		font-size: 1.1rem;
		font-weight: bold;
		color: black;
		text-decoration: none;
	}

	.piece-title:hover { text-decoration: underline; }

	.piece-date {
		font-size: 0.78rem;
		color: #666;
		white-space: nowrap;
	}

	.piece-award {
		font-size: 0.75rem;
		font-style: italic;
		margin: 0;
		opacity: 0.7;
	}

	.piece-award :global(a) { color: black; }

	.page-number {
		position: absolute;
		bottom: 0.75rem;
		right: 1rem;
		font-size: 0.65rem;
		opacity: 0.4;
	}

	.piece-excerpt {
		font-size: 0.85rem;
		line-height: 1.65;
		margin: 0;
	}
</style>
