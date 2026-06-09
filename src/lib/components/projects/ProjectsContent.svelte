<script lang="ts">
	import ProjectViewer from './ProjectViewer.svelte';
	import { projects } from '$lib/data/projects';
	import type { Project } from '$lib/data/projects';

	let { onProjectOpen }: { onProjectOpen: (open: boolean) => void } = $props();

	let selected = $state<Project | null>(null);
</script>

{#if selected}
	<ProjectViewer project={selected} onBack={() => { selected = null; onProjectOpen(false); }} />
{:else}
	<div class="gallery">
		<h2 class="gallery-heading">projects</h2>
		<div class="grid">
			{#each projects as project}
				<button class="project-btn" onclick={() => { selected = project; onProjectOpen(true); }}>
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
		height: 100%;
		overflow-y: auto;
	}

	.gallery-heading {
		font-size: 1rem;
		margin: 0;
		border-bottom: 1px solid black;
		padding-bottom: 0.4rem;
		flex-shrink: 0;
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
