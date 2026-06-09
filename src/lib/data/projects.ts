export interface Project {
	id: string;
	title: string;
	date: string;
	tagline: string;
	thumbnail: string;
	description: string;
	link: string;
}

export const projects: Project[] = [
	{
		id: 'signallost',
		title: 'Signal Lost',
		date: '2025-04-10',
		tagline: 'a 2d space platformer game',
		thumbnail: '1.png',
		description: "I built this video game for Hack Club's Juice event using Godot. I spent 106 hours on it and it was one of my first games! The premise is you are an astronaut stuck on a planet and you need to find your spaceship parts to go home. There are oxygen bubbles, aliens, plants, and gravity changing.",
		link: 'https://themagicfrog.itch.io/signal-lost',
	},
	{
		id: 'lightsaber',
		title: 'PCB Lightsaber',
		date: '2024-08-23',
		tagline: 'a PCB movement-controlled lightsaber',
		thumbnail: '1.png',
		description: "This is a PCB lightsaber controlled by a gyroscope and accelerometer that I designed. I created it originally for The Trail, an event organized by Hack Club. This was the first PCB I've ever designed! It took about 4 months in total to make.",
		link: 'https://github.com/themagicfrog/lightsaber',
	},
];
