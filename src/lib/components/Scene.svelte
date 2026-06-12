<script lang="ts">
	import { pushState, goto } from '$app/navigation';
	import { page } from '$app/state';
	import PhotographyContent from '$lib/components/photography/PhotographyContent.svelte';
	import WritingContent from '$lib/components/writing/WritingContent.svelte';
	import ArtContent from '$lib/components/art/ArtContent.svelte';
	import ProjectsContent from '$lib/components/projects/ProjectsContent.svelte';
	import AdventuresContent from '$lib/components/postcards/AdventuresContent.svelte';

	let { openWindow: initialWindow = '' }: { openWindow?: string } = $props();

	let barVisible = $state(true);
	let photographyAlbumOpen = $state(false);
	let artWorkOpen = $state(false);
	let projectOpen = $state(false);

	const activeWindow = $derived(page.state.openWindow ?? initialWindow);

	const windowSounds: Record<string, string> = {
		photography: '/sounds/cameraopen.mp3',
		writing: '/sounds/notebookopen.mp3',
		projects: '/sounds/computeropen.mp3',
		postcards: '/sounds/postcardsopen.mp3',
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

<!-- Info bar -->
<div class="bar-wrapper" class:bar-wrapper--collapsed={!barVisible}>
	<div class="topbar">
		<div class="topbar-identity">
			<img src="/images/profile/headshot.png" alt="Estella" class="topbar-headshot" />
			<div class="topbar-info">
				<span class="topbar-name">hello, i'm estella gu!</span>
				<span class="topbar-bio">tech & art @ hack club & phillips academy</span>
			</div>
		</div>

		<p class="topbar-desc">i'm always on an adventure, building new creations — click on the objects on the scene to learn more about me!</p>

		<div class="topbar-social">
			<a href="https://www.linkedin.com/in/estellagu/" target="_blank" rel="noopener">
				<img src="/images/social/linkedin.png" alt="LinkedIn" />
			</a>
			<a href="https://www.instagram.com/estella.gu_/" target="_blank" rel="noopener">
				<img src="/images/social/instagram.png" alt="Instagram" />
			</a>
			<a href="https://github.com/themagicfrog" target="_blank" rel="noopener">
				<img src="/images/social/github.png" alt="GitHub" />
			</a>
			<a href="mailto:estella.tianxing@gmail.com">
				<img src="/images/social/email.png" alt="Email" />
			</a>
		</div>
	</div>
	<button
		class="bar-toggle"
		onclick={() => (barVisible = !barVisible)}
		aria-label={barVisible ? 'hide bar' : 'show bar'}
	>
		{barVisible ? '▲' : '▼'}
	</button>
</div>

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
		{#if activeWindow !== 'postcards'}
			<button class="object postcards" onclick={openSection('/postcards', 'postcards')}>
				<img src="/images/objects/postcards.png" alt="postcards" />
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
				<PhotographyContent onAlbumOpen={(open) => photographyAlbumOpen = open} />
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
				<ArtContent onWorkOpen={(open) => artWorkOpen = open} />
			{:else if activeWindow === 'projects'}
				{#if !projectOpen}
					<button class="btn overlay-back" onclick={closeWindow}>back</button>
					<div class="overlay-heading">
						<h1>projects</h1>
					</div>
				{/if}
				<ProjectsContent onProjectOpen={(open) => projectOpen = open} />
			{:else if activeWindow === 'postcards'}
				<button class="btn overlay-back" onclick={closeWindow}>back</button>
				<AdventuresContent />
			{:else}
				<button class="btn overlay-back" onclick={closeWindow}>back</button>
				<h1>{activeWindow}</h1>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* ── Info bar ───────────────────────────────────────────── */
	.bar-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		display: flex;
		flex-direction: column;
		align-items: center;
		pointer-events: none;
	}

	.topbar {
		width: 100%;
		pointer-events: auto;
		background: white;
		display: flex;
		align-items: center;
		gap: 1.2rem;
		padding: 0.5rem 2rem;
		flex-wrap: nowrap;
		overflow: hidden;
		max-height: 8rem;
		transition: max-height 0.35s ease, padding 0.35s ease;
	}

	.bar-wrapper--collapsed .topbar {
		max-height: 0;
		padding-top: 0;
		padding-bottom: 0;
	}

	.bar-toggle {
		pointer-events: auto;
		background: white;
		border: none;
		border-radius: 0 0 0.5rem 0.5rem;
		padding: 0.15rem 1.4rem 0.25rem;
		cursor: pointer;
		font-size: 0.55rem;
		line-height: 1;
		transition: background 0.15s ease, color 0.15s ease;
	}

	.bar-toggle:hover {
		background: black;
		color: white;
	}

	.sep {
		width: 1px;
		height: 1.5rem;
		background: rgba(0, 0, 0, 0.2);
		flex-shrink: 0;
	}

	.topbar-identity {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-shrink: 0;
	}

	.topbar-headshot {
		height: 2.5rem;
		width: 2.5rem;
		object-fit: cover;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.topbar-info {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.topbar-name {
		font-size: 0.95rem;
		line-height: 1.1;
	}

	.topbar-bio {
		font-size: 0.6rem;
		opacity: 0.6;
		white-space: nowrap;
	}

	.topbar-social {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.25rem;
		flex-shrink: 0;
	}

	.topbar-social img {
		height: 0.95rem;
		width: 0.95rem;
		object-fit: contain;
		display: block;
		transition: transform 0.15s ease;
	}

	.topbar-social a:hover img {
		transform: scale(1.2);
	}

	.topbar-desc {
		font-size: 0.62rem;
		opacity: 0.7;
		line-height: 1.5;
		flex: 1;
		min-width: 0;
	}

	/* ── Home scene ─────────────────────────────────────────── */
	.home {
		position: fixed;
		inset: 0;
		overflow: hidden;
		background: #7ec86a;
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

	.camera    { top: 17%; left: 37%; }
	.camera img { max-height: 25vh; max-width: 25vw; }
	.notebook  { top: 50%; left: 8%; }
	.notebook img { max-height: 42vh; max-width: 42vw; }
	.computer  { top: 17%; left: 4%; }
	.computer img { max-height: 33vh; max-width: 33vw; }
	.ipad      { top: 50%; left: 69%; }
	.ipad img  { max-height: 43vh; max-width: 43vw; }
	.postcards { top: 16%; left: 63%; }
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

	.window-overlay--postcards   { background: #EFE6BB; }
	.window-overlay--art         { border: 20px solid #c4b5fd; }
	.window-overlay--projects    { border: 20px solid #f97316; }
	.window-overlay--writing     { border: 20px solid #f87171; }
	.window-overlay--photography { border: 20px solid #bfdbfe; }

	.overlay-content {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
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
