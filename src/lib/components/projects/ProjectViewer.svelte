<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project, onBack }: { project: Project; onBack: () => void } = $props();

	let lightbox = $state(false);
	let contentEl = $state<HTMLElement>();

	function onKeydown(e: KeyboardEvent) {
		if (lightbox) return;
		if (e.key === 'ArrowDown') { contentEl?.scrollBy({ top: 200, behavior: 'smooth' }); e.preventDefault(); }
		else if (e.key === 'ArrowUp') { contentEl?.scrollBy({ top: -200, behavior: 'smooth' }); e.preventDefault(); }
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div class="viewer">
	<div class="topbar">
		<button class="back-btn" onclick={onBack}>← projects</button>
		<span class="date">{project.date}</span>
	</div>

	<div class="content" bind:this={contentEl}>
		<div class="header">
			<h2 class="title">{project.title}</h2>
			<p class="tagline">{project.tagline}</p>
		</div>

		<button class="img-btn" onclick={() => lightbox = true}>
			<img src="/content/projects/{project.id}/{project.thumbnail}" alt={project.title} class="main-img" />
		</button>

		<p class="description">{project.description}</p>

		<a href={project.link} target="_blank" rel="noopener" class="see-more">see more</a>
	</div>
</div>

{#if lightbox}
	<div class="lightbox" onclick={() => lightbox = false} role="presentation">
		<button class="lightbox-close" onclick={(e) => { e.stopPropagation(); lightbox = false; }}>✕</button>
		<img src="/content/projects/{project.id}/{project.thumbnail}" alt={project.title} class="lightbox-img" />
	</div>
{/if}

<style>
	.viewer {
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid black;
		flex-shrink: 0;
	}

	.back-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.8rem;
		padding: 0;
	}

	.back-btn:hover { text-decoration: underline; }

	.date {
		font-size: 0.75rem;
		background: #eee;
		padding: 0.25rem 0.6rem;
		border-radius: 4px;
	}

	.content {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1rem 1.25rem;
	}

	.header { display: flex; flex-direction: column; gap: 0.2rem; }

	.title {
		font-size: 1.4rem;
		margin: 0;
	}

	.tagline {
		font-size: 0.85rem;
		font-style: italic;
		color: #555;
		margin: 0;
	}

	.img-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: zoom-in;
		width: 100%;
	}

	.main-img {
		width: 100%;
		max-height: 28vh;
		object-fit: cover;
		display: block;
		border: 1px solid #ddd;
	}

	.description {
		font-size: 0.85rem;
		line-height: 1.6;
		margin: 0;
	}

	.see-more {
		font-size: 0.9rem;
		font-weight: bold;
		color: black;
		text-decoration: none;
	}

	.see-more:hover { text-decoration: underline; }

	/* Lightbox */
	.lightbox {
		position: absolute;
		inset: 0;
		background: rgba(0,0,0,0.88);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		cursor: pointer;
	}

	.lightbox-close {
		position: absolute;
		top: 0.6rem;
		right: 2.5rem;
		background: none;
		border: none;
		color: white;
		font-size: 1.1rem;
		cursor: pointer;
	}

	.lightbox-img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
</style>
