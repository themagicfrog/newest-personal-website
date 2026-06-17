<script lang="ts">
	const highlights = [
		{ title: 'Tell People You Love Them', type: 'photography', image: '/content/photography/tellpeopleyoulovethem/1.jpg', href: '/photography/tellpeopleyoulovethem' },
		{ title: '"From a Dreamer"',           type: 'art',         image: '/content/art/works/fromadreamer/1.jpg',            href: '/art/fromadreamer' },
		{ title: 'Signal Lost',                type: 'project',     image: '/content/projects/signallost/1.png',               href: '/projects/signallost' },
		{ title: 'The Paper Person',           type: 'writing',     image: '/content/writing/paperperson.png',                 href: '/writing' },
		{ title: 'Juice',                      type: 'adventure',   image: '/content/postcards/juice.png',                     href: '/adventures/juice' },
	];
</script>

<div class="intro">

	<!-- ── Hero ─────────────────────────────────────────────── -->
	<section class="hero">
		<img src="/images/profile/headshot.png" alt="Estella Gu" class="headshot" />
		<div class="hero-text">
			<h1 class="hero-name">hello, i'm estella gu!</h1>
			<p class="hero-bio">tech & art @ hack club & phillips academy</p>
			<p class="hero-desc">i'm always on an adventure, building new creations</p>
		</div>
		<div class="socials">
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
	</section>

	<!-- ── Highlights ───────────────────────────────────────── -->
	<section class="highlights">
		<h2 class="section-title">highlights</h2>
		<div class="highlights-grid">
			{#each highlights as item}
				<a class="highlight-card" href={item.href}>
					<img src={item.image} alt={item.title} class="highlight-img" />
					<div class="highlight-meta">
						<span class="highlight-title">{item.title}</span>
						<span class="highlight-type">{item.type}</span>
					</div>
				</a>
			{/each}
		</div>
	</section>

</div>

<style>
	.intro {
		flex-shrink: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-image: url('/images/scene/grass.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	/* ── Hero ────────────────────────────────────────────────── */
	.hero {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 2.5rem 8vw 1.5rem;
	}

	.headshot {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
		border: 2px solid #e5e5e5;
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		flex: 1;
	}

	.hero-name {
		font-size: 1.1rem;
		margin: 0;
		font-weight: bold;
		color: #162a0a;
	}

	.hero-bio {
		font-size: 0.65rem;
		opacity: 0.8;
		margin: 0;
		color: #162a0a;
	}

	.hero-desc {
		font-size: 0.75rem;
		margin: 0.1rem 0 0;
		color: #162a0a;
	}

	.socials {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
		flex-shrink: 0;
	}

	.socials a {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
		text-decoration: none;
		transition: transform 0.15s ease;
	}

	.socials a:hover {
		transform: scale(1.1);
	}

	.socials img {
		height: 1.6rem;
		width: 1.6rem;
		object-fit: contain;
		display: block;
		filter: brightness(0) saturate(100%) invert(13%) sepia(50%) saturate(600%) hue-rotate(75deg) brightness(0.45);
	}


	/* ── Highlights ──────────────────────────────────────────── */
	.highlights {
		padding: 0.75rem 8vw 2rem;
	}

	.section-title {
		font-size: 0.85rem;
		font-weight: bold;
		margin: 0 0 1rem;
		letter-spacing: 0.04em;
		color: #162a0a;
	}

	.highlights-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.75rem;
	}

	.highlight-card {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		text-decoration: none;
		cursor: pointer;
		transition: transform 0.15s ease;
	}

	.highlight-card:hover {
		transform: scale(1.03);
	}

	.highlight-img {
		width: 100%;
		aspect-ratio: 3/4;
		object-fit: cover;
		border: 1px solid #e0e0e0;
	}

	.highlight-meta {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.highlight-title {
		font-size: 0.65rem;
		line-height: 1.3;
		color: #162a0a;
	}

	.highlight-type {
		font-size: 0.55rem;
		opacity: 0.7;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #162a0a;
	}
</style>
