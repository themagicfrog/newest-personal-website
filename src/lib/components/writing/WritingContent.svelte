<script lang="ts">
	import { pieces } from '$lib/data/writing';

	const { onclose }: { onclose: () => void } = $props();

	let scrollEl = $state<HTMLElement>();

	function onKeydown(e: KeyboardEvent) {
		if (!scrollEl) return;
		if (e.key === 'ArrowLeft') { scrollEl.scrollBy({ left: -400, behavior: 'smooth' }); e.preventDefault(); }
		else if (e.key === 'ArrowRight') { scrollEl.scrollBy({ left: 400, behavior: 'smooth' }); e.preventDefault(); }
	}

	function hscroll(el: HTMLElement) {
		function onwheel(e: WheelEvent) {
			if (!el.contains(e.target as Node)) return;
			let delta = e.deltaY;
			if (e.deltaMode === 1) delta *= 30;
			if (e.deltaMode === 2) delta *= 300;
			el.scrollLeft += delta;
			e.preventDefault();
		}
		window.addEventListener('wheel', onwheel, { passive: false });
		return { destroy() { window.removeEventListener('wheel', onwheel); } };
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div class="writing-scroll" use:hscroll bind:this={scrollEl}>
	<button class="back-btn" onclick={onclose}>back</button>
	<div class="panel intro-panel">
		<div class="intro-text">
			<h1>writing</h1>
			<p>I enjoy writing short stories, especially sci-fi and mystery.</p>
		</div>
	</div>

	{#each pieces as piece}
		<div class="panel piece-panel">
			<div class="piece-header">
				<a href={piece.link} target="_blank" rel="noopener" class="piece-title">{piece.title}</a>
				<span class="piece-date">{piece.date}</span>
			</div>
			{#each piece.awards as award}
				<span class="piece-award">{@html award}</span>
			{/each}
			<p class="piece-excerpt">{piece.excerpt}</p>
		</div>
	{/each}
</div>

<style>
	.writing-scroll {
		display: flex;
		flex-direction: row;
		overflow-x: auto;
		overflow-y: hidden;
		height: 100%;
	}

	.panel {
		min-width: 50%;
		max-width: 50%;
		flex-shrink: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 2.5rem 2rem;
		overflow-wrap: break-word;
		word-break: break-word;
	}

	.intro-panel {
		justify-content: center;
		gap: 0.75rem;
	}

	.back-btn {
		position: fixed;
		top: 1.5rem;
		left: 1.5rem;
		z-index: 10;
		background: none;
		border: 1px solid black;
		padding: 0.3rem 0.8rem;
		cursor: pointer;
		font-size: 0.85rem;
	}

	.back-btn:hover {
		background: black;
		color: white;
	}

	.intro-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		text-align: center;
	}

	h1 { font-size: 1.8rem; }

	p { font-size: 0.95rem; }

	.piece-panel {
		justify-content: center;
		gap: 0.5rem;
		border-left: 2px solid black;
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
		font-size: 0.8rem;
		white-space: nowrap;
		color: #555;
	}

	.piece-award {
		font-size: 0.78rem;
		font-style: italic;
	}

	.piece-award :global(a) { color: black; }

	.piece-excerpt {
		font-size: 0.85rem;
		margin: 0.25rem 0 0;
		line-height: 1.5;
	}
</style>
