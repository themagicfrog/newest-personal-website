export interface Artwork {
	id: string;
	title: string;
	date: string;
	thumbnail: string;
	photos: string[];
	description?: string;
	link?: string;
}

export const artworks: Artwork[] = [
	{
		id: 'fromadreamer',
		title: '"from a dreamer"',
		date: 'February 2026',
		thumbnail: '1.jpg',
		photos: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg'],
		description: `I made this piece as part of my 3D design art class. I started by cutting wood and screwing it together into a square frame, then covering the frame with pages from old children's books. I collected a bunch of old photo slides from the massive pile of random objects we were given in class to pick from, and then I sorted through the slides to find the ones that were interesting to me. I hot-glued a wooden sheet with cutout shapes into the frame and filled the sides with photo slides as a background. I shaped two paper hands, modeled after the proportions of my own hands, and placed them reaching inward toward a small clay head that I made at the center. The photo slides represent visual stories and the book pages represent written stories, as I am a photographer and a writer. The shapes in the wood background resemble clouds, or dreams, and when light passes through the frame, the slide images and cloud silhouettes are projected onto the table. The paper hands reach into the stories and imaginations inside and the small clay head in the center is the dreamer, who is shaped by all those experiences surrounding it. I really enjoyed making this piece! "from a dreamer" is currently on display in the Thompson Gallery in Elson. Thank you to everyone who helped along the way!`,
	},
	{
		id: 'trailbook',
		title: 'The Trail Book',
		date: '',
		thumbnail: '1.png',
		photos: ['1.png','2.png','3.png','4.png','5.png'],
		description: `Last summer, I went on a backpacking trip along the Pacific Crest Trail. When I returned, I hand-crafted, wrote, bound, and decorated a book containing all the amazing tales from my adventures there. Some of my favorite parts are the bear pop-up, the crawfish model, 3D toilet, page of flowers, and campfire pop-up.`,
		link: 'https://docs.google.com/presentation/d/10uJnXMQ8QBkAP3cAIPET5hN4jJUoEL9lMYbe5iTUSe0/edit?usp=sharing',
	},
	{
		id: 'bean',
		title: 'Bean Furniture Set',
		date: '',
		thumbnail: '1.jpg',
		photos: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'],
		description: `I created this piece as a part of my 3D design art class. Our final project was to design a cohesive three-piece furniture set that combines both form and function, and then build the piece in real life at a smaller scale. The overall bean-theme I came up with is based on the bean part of beanbags. The set centers around the round, kidney bean chair. This chair is accompanied with a footstool, which is designed to look like peas in a pod. The final piece is a cylindrical side table shaped like a can of baked beans. I used Blender to model the chair and footstool and 3D-printed them in my school's makerspace. The side table was made from layers of laser-cut wood stacked together. I painted the chair and footstool and added a digitally drawn bean label to the table. I wanted the furniture set to be unique, playful, and whimsical. Overall, I really enjoyed designing and building this! :)`,
	},
];
