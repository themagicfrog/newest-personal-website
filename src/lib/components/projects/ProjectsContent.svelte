<script lang="ts">
	import { replaceState } from '$app/navigation';
	import { untrack } from 'svelte';
	import ProjectViewer from './ProjectViewer.svelte';
	import { projects, type Project } from '$lib/data/projects';

	let { onProjectOpen, initialProjectId = '' }: { onProjectOpen: (open: boolean) => void; initialProjectId?: string } = $props();

	const initial = untrack(() => initialProjectId ? projects.find(p => p.id === initialProjectId) ?? null : null);
	let selected = $state<Project | null>(initial);
	let galleryEl = $state<HTMLElement>();

	$effect(() => {
		onProjectOpen(selected !== null);
		replaceState(selected ? `/projects/${selected.id}` : '/projects', { openWindow: 'projects' });
	});

	function onKeydown(e: KeyboardEvent) {
		if (selected) return;
		if (e.key === 'ArrowDown') { galleryEl?.scrollBy({ top: 200, behavior: 'smooth' }); e.preventDefault(); }
		else if (e.key === 'ArrowUp') { galleryEl?.scrollBy({ top: -200, behavior: 'smooth' }); e.preventDefault(); }
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if selected}
	<ProjectViewer project={selected} onBack={() => { selected = null; }} />
{:else}
	<div class="gallery" bind:this={galleryEl}>
		<div class="grid">
			{#each projects as project}
				<button class="project-btn" onclick={() => { selected = project; }}>
					<img
						src="/content/projects/{project.id}/{project.thumbnail}"
						alt={project.title}
						class="thumb"
						loading="lazy"
					/>
					<div class="project-info">
						<span class="project-title">{project.title}</span>
						<span class="project-tagline">{project.tagline}</span>
					</div>
				</button>
			{/each}
		</div>
	</div>
{/if}

<style>
	.gallery {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		align-content: start;
	}

	.project-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		text-align: left;
	}

	.thumb {
		width: 100%;
		aspect-ratio: 16/9;
		object-fit: cover;
		display: block;
		border: 1px solid #ddd;
		transition: opacity 0.15s;
	}

	.project-btn:hover .thumb { opacity: 0.85; }

	.project-info {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.project-title {
		font-size: 0.85rem;
		font-weight: bold;
	}

	.project-tagline {
		font-size: 0.75rem;
		font-style: italic;
		color: #555;
	}
</style>
