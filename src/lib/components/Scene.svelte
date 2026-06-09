<script lang="ts">
	import { untrack } from 'svelte';
	import { pushState, goto } from '$app/navigation';
	import { page } from '$app/state';
	import PhotographyContent from '$lib/components/photography/PhotographyContent.svelte';
	import WritingContent from '$lib/components/writing/WritingContent.svelte';
	import ArtContent from '$lib/components/art/ArtContent.svelte';
	import ProjectsContent from '$lib/components/projects/ProjectsContent.svelte';
	import AdventuresContent from '$lib/components/postcards/AdventuresContent.svelte';

	let { openWindow: initialWindow = '' }: { openWindow?: string } = $props();

	let bagOpen = $state(untrack(() => true));
	let cardOpen = $state(false);
	let photographyAlbumOpen = $state(false);
	let artWorkOpen = $state(false);
	let projectOpen = $state(false);

	// Active section window — set via pushState (home page) or direct URL navigation (initialWindow prop)
	const activeWindow = $derived(page.state.openWindow ?? initialWindow);

	const windowFrames: Record<string, string> = {
		photography: '/images/objects/cameraframe.png',
		writing: '/images/objects/notebookframe.png',
		art: '/images/objects/ipadframe.png',
		postcards: '/images/objects/postcardsframe.png',
		projects: '/images/objects/computerframe.png',
	};

	const windowSounds: Record<string, string> = {
		photography: '/sounds/cameraopen.mp3',
		writing: '/sounds/notebookopen.mp3',
		projects: '/sounds/computeropen.mp3',
		postcards: '/sounds/postcardsopen.mp3',
		art: '/sounds/ipadopen.mp3',
	};

	// Svelte action: centers el and makes it draggable via pointer events on window.
	function draggable(el: HTMLElement) {
		let x = 0, y = 0;
		el.style.transform = 'translate(-50%, -50%)';
		function onDown(e: PointerEvent) {
			e.preventDefault();
			const startX = e.clientX - x;
			const startY = e.clientY - y;
			function onMove(e: PointerEvent) {
				x = e.clientX - startX;
				y = e.clientY - startY;
				el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
			}
			function onUp() {
				window.removeEventListener('pointermove', onMove);
				window.removeEventListener('pointerup', onUp);
			}
			window.addEventListener('pointermove', onMove);
			window.addEventListener('pointerup', onUp);
		}
		el.addEventListener('pointerdown', onDown);
		return { destroy() { el.removeEventListener('pointerdown', onDown); } };
	}

	// frameVisible: true while the opening zoom animation is playing
	let frameVisible = $state(false);
	let originX = $state(50); // % of viewport width — where the frame zooms from
	let originY = $state(50); // % of viewport height

	function toggleBag() {
		if (!bagOpen) new Audio('/sounds/bagopen.mp3').play();
		bagOpen = !bagOpen;
	}

	function openCard(e: MouseEvent) {
		e.stopPropagation();
		new Audio('/sounds/cardopen.mp3').play();
		cardOpen = true;
	}

	function openSection(path: string, name: string) {
		return (e: MouseEvent) => {
			e.preventDefault();
			const el = e.currentTarget as HTMLElement;
			const r = el.getBoundingClientRect();
			originX = ((r.left + r.width / 2) / window.innerWidth) * 100;
			originY = ((r.top + r.height / 2) / window.innerHeight) * 100;
			if (windowSounds[name]) new Audio(windowSounds[name]).play();
			pushState(path, { openWindow: name });
			frameVisible = true;
		};
	}

	function onFrameAnimationEnd() {
		frameVisible = false;
	}

	function closeWindow() {
		frameVisible = false;
		if (initialWindow) goto('/', { state: { bagOpen: true } });
		else history.back();
	}
</script>

<div class="home" role="presentation">
	<div class="scene">
		<button class="bag" class:bag-closed={!bagOpen} onclick={toggleBag}>
			<img src={bagOpen ? '/images/scene/bag-open.png' : '/images/scene/bag-close.png'} alt="bag" />
			{#if !cardOpen}
				<div class="card" onclick={openCard} role="button" tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && openCard(e as any)}>
					<img src="/images/scene/card.png" alt="card" />
				</div>
			{/if}
		</button>
		{#if bagOpen}
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
		{/if}
	</div>
</div>

{#if cardOpen}
	<div class="card-popup" role="dialog" aria-modal="true" tabindex="-1" use:draggable>
		<div class="card-text">
			<div class="card-header">
				<div class="card-intro">
					<span class="card-hi">hi, i'm</span>
					<span class="card-name">estella gu!</span>
				</div>
				<img src="/images/profile/headshot.png" alt="Estella" class="card-headshot" />
			</div>
			<span class="card-bio">art & technology ★ Hack Club ★ Phillips Andover ★ 15</span>
			<div class="card-links">
				<a href="https://www.linkedin.com/in/estellagu/" target="_blank" rel="noopener"><img src="/images/social/linkedin.png" alt="LinkedIn" /></a>
				<a href="https://www.instagram.com/estella.gu_/" target="_blank" rel="noopener"><img src="/images/social/instagram.png" alt="Instagram" /></a>
				<a href="https://github.com/themagicfrog" target="_blank" rel="noopener"><img src="/images/social/github.png" alt="GitHub" /></a>
				<a href="mailto:estella.tianxing@gmail.com"><img src="/images/social/email.png" alt="Email" /></a>
			</div>
		</div>
		<div class="card-bottom">
			<div class="card-desc">
				<p>i'm always on an adventure, building new creations</p>
				<p>explore the decorations on my bag and the different items in my bag to learn about me!</p>
				<p>some things i enjoy:</p>
			</div>
			<nav class="card-nav">
				<a href="/photography">photography</a>
				<a href="/writing">writing</a>
				<a href="/projects">technical projects</a>
				<a href="/art">art</a>
				<a href="/postcards">adventures</a>
			</nav>
		</div>
		<button class="btn card-back" onclick={() => (cardOpen = false)}>back</button>
	</div>
{/if}

{#if activeWindow}
	<!--
		Content overlay: fades in behind the frame animation.
		For direct URL navigation (no frame animation) it appears immediately.
	-->
	<div
		class="window-overlay window-overlay--{activeWindow}"
		class:window-overlay--animated={!initialWindow}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
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

	<!--
		Frame zoom animation: separate fixed element on top of the overlay.
		Scales from tiny at the click origin up past fullscreen, then fades out.
		Removed from DOM once animation ends.
	-->
	{#if frameVisible && windowFrames[activeWindow]}
		<img
			src={windowFrames[activeWindow]}
			alt=""
			class="frame-zoom"
			style:transform-origin="{originX}% {originY}%"
			onanimationend={onFrameAnimationEnd}
		/>
	{/if}
{/if}

<style>
	/* ── Home scene ─────────────────────────────────────────── */
	.home {
		position: fixed;
		inset: 0;
		overflow: hidden;
		background-image: url('/images/scene/grass.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.scene {
		position: relative;
		width: 100%;
		height: 100%;
	}

	/* ── Bag ────────────────────────────────────────────────── */
	.bag {
		position: absolute;
		top: 65%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.bag img:first-child {
		max-height: 50vh;
		max-width: 50vw;
		display: block;
		transition: transform 0.2s ease;
	}

	.bag-closed:hover img:first-child {
		transform: scale(1.08);
	}

	/* ── Card on bag ────────────────────────────────────────── */
	.card {
		position: absolute;
		top: 81%;
		left: 50%;
		transform: translate(-50%, -50%);
		cursor: pointer;
	}

	.card img {
		width: 4vw;
		display: block;
		animation: pulse 1.8s ease-in-out infinite;
		transition: transform 0.2s ease;
	}

	.card:hover img {
		transform: scale(1.15);
		animation: none;
	}

	@keyframes pulse {
		0%, 100% { transform: scale(1); }
		50%       { transform: scale(1.07); }
	}

	/* ── Bag objects ────────────────────────────────────────── */
	.object {
		position: absolute;
		max-height: 40vh;
		max-width: 40vw;
		display: block;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		animation: wobble 2.4s ease-in-out infinite;
		transition: transform 0.2s ease;
	}

	.object:hover {
		animation: none;
		transform: scale(1.12);
	}

	.object img {
		max-height: 40vh;
		max-width: 40vw;
		display: block;
	}

	@keyframes wobble {
		0%, 100% { transform: rotate(-3deg); }
		50%       { transform: rotate(3deg); }
	}

	/* Positions around the bag */
	.camera    { top: 14%; left: 70%; }
	.camera img { max-height: 25vh; max-width: 25vw; }
	.notebook  { top: 55%; left: 8%; }
	.notebook img { max-height: 32vh; max-width: 32vw; }
	.computer  { top: 55%; left: 68%; }
	.computer img { max-height: 33vh; max-width: 33vw; }
	.ipad      { top: 5%;  left: 2%;  }
	.postcards { top: 5%;  left: 35%; }

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

	/* ── Card popup ─────────────────────────────────────────── */
	.card-popup {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 100;
		background: white;
		border: 5px solid black;
		padding: clamp(1.5rem, 3vw, 3rem) clamp(1.5rem, 4vw, 4rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: clamp(0.75rem, 1.5vh, 1.5rem);
		width: clamp(300px, 50vw, 560px);
		max-height: 90vh;
		overflow-y: auto;
		padding-top: clamp(2.5rem, 4vh, 3rem);
		cursor: grab;
		user-select: none;
	}

	.card-popup:active { cursor: grabbing; }

	.card-back {
		position: absolute;
		top: 1rem;
		left: 1rem;
	}

	.card-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: clamp(0.75rem, 1.5vw, 1.5rem);
		flex-wrap: wrap;
		justify-content: center;
	}

	.card-intro {
		display: flex;
		flex-direction: column;
	}

	.card-headshot {
		height: clamp(4rem, 8vw, 8rem);
		width: clamp(4rem, 8vw, 8rem);
		object-fit: cover;
	}

	.card-hi   { font-size: clamp(0.75rem, 1vw, 1rem); }
	.card-name { font-size: clamp(1.5rem, 2.5vw, 2.5rem); }

	.card-bio {
		font-size: clamp(0.7rem, 0.85vw, 0.85rem);
		margin-top: 0.5rem;
		text-align: center;
	}

	.card-links {
		display: flex;
		gap: clamp(0.5rem, 1vw, 1rem);
		margin-top: 0.75rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.card-links img {
		height: clamp(1.5rem, 2vw, 2rem);
		width: clamp(1.5rem, 2vw, 2rem);
		object-fit: contain;
		transition: transform 0.15s ease;
	}

	.card-links a:hover img { transform: scale(1.2); }

	.card-bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
	}

	.card-desc {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		font-size: clamp(0.75rem, 0.9vw, 0.9rem);
		text-align: center;
	}

	.card-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.4rem 1.2rem;
		max-width: 80%;
	}

	.card-nav a {
		text-decoration: none;
		color: black;
		font-size: 0.9rem;
	}

	.card-nav a:hover { text-decoration: underline; }

	/* ── Fullscreen content overlay ─────────────────────────── */
	.window-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: white;
		overflow: hidden;
	}

	/* Fade the overlay in from transparent while the frame animation plays */
	.window-overlay--animated {
		animation: overlay-reveal 2s ease forwards;
	}

	@keyframes overlay-reveal {
		0%   { opacity: 0; }
		25%  { opacity: 0; }
		100% { opacity: 1; }
	}

	.window-overlay--postcards { background: #EFE6BB; }

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

	/* ── Frame zoom animation ───────────────────────────────── */
	/*
	 * Separate fixed element on top of the overlay (z-index 101).
	 * Scales from tiny at the click origin up to ~2.5x the viewport,
	 * so the frame's inner window grows to fill the screen before fading.
	 */
	.frame-zoom {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		pointer-events: none;
		z-index: 101;
		animation: frame-zoom 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
	}

	@keyframes frame-zoom {
		0% {
			transform: scale(0.07);
			opacity: 1;
		}
		60% {
			opacity: 1;
		}
		100% {
			transform: scale(2.6);
			opacity: 0;
		}
	}
</style>
