export interface Piece {
	title: string;
	date: string;
	awards: string[];
	excerpt: string;
	link: string;
}

export const pieces: Piece[] = [
	{
		title: 'The Paper Person',
		date: 'February 2024',
		awards: ['Winner of Scholastic Art & Writing Gold Key and American Voices Nominee'],
		excerpt: 'The Paper Person is about a curious creature made of paper who wanders alone in the forest. They spends their days collecting paper in the forest, sticking them on themselves, and absorbing the words and pictures on the paper. Their thoughts, memories, and opinions are made up of the papers they collect. Then one night, a forest fire starts.',
		link: 'https://docs.google.com/document/d/1Y6fB_vSWyawucYXhelljakwTQ4108lc6YyVwJDNX-Ho/edit?usp=sharing',
	},
	{
		title: 'Face Down',
		date: 'August 2025',
		awards: ['Published in the Anthology Magazine (<a href="https://grubstreet.org/write/2025-teen-writing-fellows" target="_blank" rel="noopener">Grubstreet 2025 Teen Writing Fellowship</a>)'],
		excerpt: "I jolt awake to the sharp feeling of a clothes hanger digging into my back. I'm in the closet. I open the door just a crack, enough to see my bed across the room, and to see myself sleeping in it. It is a strange sight, to see yourself there when you are clearly right here....",
		link: 'https://docs.google.com/document/d/1ouSxG8XvtgT3jlNa9lJ181wvJRAF5o-yac6rsb9GQRk/edit?usp=sharing',
	},
	{
		title: 'Our Simulated World',
		date: 'May 2024',
		awards: ['Published in the Carlisle Moskiddo Newspaper'],
		excerpt: '"It\'s hard to argue that we aren\'t living in a simulated world" - Neil DeGrasse Tyson "There\'s one in billions chance we\'re in base reality" - Elon Musk Ever since humans roamed the land, we\'ve asked questions. Where did we come from? Why are we here? What purpose do we serve? What is the meaning of life?',
		link: 'https://docs.google.com/document/d/1hMr8EGQUKd4gtr4lRPPSJMYIVkNYvaMlh-ksy1l2-TA/edit?tab=t.0',
	},
];
