<script lang="ts">
	import { albums, type Album } from '$lib/data/albums';

	let { onSelect }: { onSelect: (album: Album) => void } = $props();
</script>

<div class="grid">
	{#each albums as album}
		<button class="album" onclick={() => onSelect(album)}>
			<div class="cover">
				<img src="/content/photography/{album.id}/{album.photos[0]}" alt={album.title} />
			</div>
			<span class="label">{album.title}</span>
		</button>
	{/each}
</div>

<style>
	.grid {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
		justify-content: center;
		padding: 2rem;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}

	.album {
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
	}

	.cover {
		width: 10vw;
		height: 10vw;
		border: 2px solid black;
		overflow: hidden;
	}

	.cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.label {
		font-size: 0.85rem;
		text-align: center;
	}
</style>
