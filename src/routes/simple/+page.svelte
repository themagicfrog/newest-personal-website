<script lang="ts">
	const sections = [
		{ label: 'Photography', href: '/photography' },
		{ label: 'Writing', href: '/writing' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Art', href: '/art' },
		{ label: 'Adventures', href: '/postcards' }
	];
</script>

<main>
	<header>
		<h1>Estella Gu</h1>
		<a href="/">Full experience</a>
	</header>

	<nav>
		{#each sections as { label, href }}
			<a {href}>{label}</a>
		{/each}
	</nav>
</main>

<style>
	main {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 2rem;
	}
	nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
