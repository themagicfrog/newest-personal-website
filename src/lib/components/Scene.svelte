<script lang="ts">
	import { pushState, goto } from '$app/navigation';
	import { page } from '$app/state';
	import PhotographyContent from '$lib/components/photography/PhotographyContent.svelte';
	import WritingContent from '$lib/components/writing/WritingContent.svelte';
	import ArtContent from '$lib/components/art/ArtContent.svelte';
	import ProjectsContent from '$lib/components/projects/ProjectsContent.svelte';
	import AdventuresContent from '$lib/components/postcards/AdventuresContent.svelte';

	let { openWindow: initialWindow = '', initialAlbumId = '', initialProjectId = '', initialWorkId = '' }: { openWindow?: string; initialAlbumId?: string; initialProjectId?: string; initialWorkId?: string } = $props();

	let photographyAlbumOpen = $state(false);
	let artWorkOpen = $state(false);
	let projectOpen = $state(false);

	const activeWindow = $derived(page.state.openWindow ?? initialWindow);

	$effect(() => {
		document.body.style.overflow = activeWindow ? 'hidden' : '';
		return () => { document.body.style.overflow = ''; };
	});

	const windowSounds: Record<string, string> = {
		photography: '/sounds/cameraopen.mp3',
		writing: '/sounds/notebookopen.mp3',
		projects: '/sounds/computeropen.mp3',
		adventures: '/sounds/postcardsopen.mp3',
		art: '/sounds/ipadopen.mp3',
	};

	function openSection(path: string, name: string) {
		return (e: MouseEvent) => {
			e.preventDefault();
			if (windowSounds[name]) new Audio(windowSounds[name]).play();
			pushState(path, { openWindow: name });
		};
	}

	function closeWindow() {
		if (initialWindow) goto('/', { state: { bagOpen: true } });
		else history.back();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && activeWindow) closeWindow();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<!-- Scene -->
<div class="home" role="presentation">
	<div class="scene">
		{#if activeWindow !== 'photography'}
			<button class="object camera" onclick={openSection('/photography', 'photography')}>
				<img src="/images/objects/camera.png" alt="camera" />
			</button>
		{/if}
		{#if activeWindow !== 'writing'}
			<button class="object notebook" onclick={openSection('/writing', 'writing')}>
				<img src="/images/objects/notebook.png" alt="notebook" />
			</button>
		{/if}
		{#if activeWindow !== 'projects'}
			<button class="object computer" onclick={openSection('/projects', 'projects')}>
				<img src="/images/objects/computer.png" alt="computer" />
			</button>
		{/if}
		{#if activeWindow !== 'art'}
			<button class="object ipad" onclick={openSection('/art', 'art')}>
				<img src="/images/objects/ipad.png" alt="ipad" />
			</button>
		{/if}
		{#if activeWindow !== 'adventures'}
			<button class="object postcards" onclick={openSection('/adventures', 'adventures')}>
				<img src="/images/objects/postcards.png" alt="adventures" />
			</button>
		{/if}
	</div>
</div>

{#if activeWindow}
	<div class="window-overlay window-overlay--{activeWindow}" role="dialog" aria-modal="true" tabindex="-1">
		<div class="overlay-content">
			{#if activeWindow === 'photography'}
				{#if !photographyAlbumOpen}
					<button class="btn overlay-back" onclick={closeWindow}>back</button>
					<div class="overlay-heading">
						<h1>photography</h1>
						<p>I take photos to document where I go and to capture interesting things I see. I enjoy street photography especially.</p>
					</div>
				{/if}
				<PhotographyContent onAlbumOpen={(open) => photographyAlbumOpen = open} initialAlbumId={initialAlbumId} />
			{:else if activeWindow === 'writing'}
				<WritingContent onclose={closeWindow} />
			{:else if activeWindow === 'art'}
				{#if !artWorkOpen}
					<button class="btn overlay-back" onclick={closeWindow}>back</button>
					<div class="overlay-heading">
						<h1>art</h1>
						<p>I really enjoy experimenting with art in many ways! I enjoy digital art, mixed media, graphic design, and character design.</p>
					</div>
				{/if}
				<ArtContent onWorkOpen={(open) => artWorkOpen = open} initialWorkId={initialWorkId} />
			{:else if activeWindow === 'projects'}
				{#if !projectOpen}
					<button class="btn overlay-back" onclick={closeWindow}>back</button>
					<div class="overlay-heading">
						<h1>tech</h1>
					</div>
				{/if}
				<ProjectsContent onProjectOpen={(open) => projectOpen = open} initialProjectId={initialProjectId} />
			{:else if activeWindow === 'adventures'}
				<AdventuresContent onclose={closeWindow} />
			{:else}
				<button class="btn overlay-back" onclick={closeWindow}>back</button>
				<h1>{activeWindow}</h1>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* ── Home scene ─────────────────────────────────────────── */
	.home {
		position: relative;
		flex-shrink: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-image: url('/images/scene/grass.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.scene {
		position: relative;
		width: 100%;
		height: 100%;
	}

	/* ── Scene objects ─────────────────────────────────────── */
	.object {
		position: absolute;
		max-height: 40vh;
		max-width: 40vw;
		display: block;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.object:hover {
		transform: scale(1.12);
	}

	.object img {
		max-height: 40vh;
		max-width: 40vw;
		display: block;
	}

	.camera    { top: 13%; left: 37%; }
	.camera img { max-height: 25vh; max-width: 25vw; }
	.notebook  { top: 50%; left: 8%; }
	.notebook img { max-height: 42vh; max-width: 42vw; }
	.computer  { top: 13%; left: 4%; }
	.computer img { max-height: 33vh; max-width: 33vw; }
	.ipad      { top: 50%; left: 69%; }
	.ipad img  { max-height: 43vh; max-width: 43vw; }
	.postcards { top: 12%; left: 63%; }
	.postcards img { max-height: 33vh; max-width: 33vw; }

	/* ── Shared button ──────────────────────────────────────── */
	.btn {
		background: none;
		border: 1px solid black;
		padding: 0.3rem 0.8rem;
		cursor: pointer;
		font-size: 0.85rem;
	}

	.btn:hover {
		background: black;
		color: white;
	}

	/* ── Fullscreen content overlay ─────────────────────────── */
	.window-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: white;
		overflow: hidden;
	}

	.window-overlay--adventures  {
		background-image: url('/images/frames/postcardbackground.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.window-overlay--art         { border: none; }
	.window-overlay--art::after {
		content: '';
		position: fixed;
		inset: 0;
		background-image: url('/images/frames/ipadframe.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		pointer-events: none;
		z-index: 10;
	}
	.window-overlay--art .overlay-content { padding: 2vh 6vw 6vh; }
	.window-overlay--projects    { border: none; }
	.window-overlay--projects .overlay-content { padding: 2vh 6vw 6vh; }
	.window-overlay--projects::after {
		content: '';
		position: fixed;
		inset: 0;
		background-image: url('/images/frames/computerframe.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		pointer-events: none;
		z-index: 10;
	}
	.window-overlay--writing     { border: none; }
	.window-overlay--writing::after {
		content: '';
		position: fixed;
		inset: 0;
		background-image: url('/images/frames/notebookframe.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		pointer-events: none;
		z-index: 10;
	}
	.window-overlay--writing .overlay-content { padding: 2vh 6vw 6vh; }
	.window-overlay--photography { border: none; }
	.window-overlay--photography::after {
		content: '';
		position: fixed;
		inset: 0;
		background-image: url('/images/frames/cameraframe.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		pointer-events: none;
		z-index: 10;
	}
	.window-overlay--photography .overlay-content { padding: 6vh 28vw 6vh 8vw; }

	.overlay-content {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		padding: 0 4vw;
	}

	.overlay-back {
		align-self: flex-start;
		margin: 1.5rem 0 0 1.5rem;
		flex-shrink: 0;
	}

	.overlay-heading {
		text-align: center;
		padding: 0.5rem 1.5rem 0;
		flex-shrink: 0;
	}

	.overlay-heading h1 {
		font-size: 1.5rem;
		margin: 0 0 0.25rem;
	}

	.overlay-heading p {
		font-size: 0.85rem;
		margin: 0;
	}
</style>
