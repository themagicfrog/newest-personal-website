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
		id: 'bean',
		title: 'Bean Furniture Set',
		date: 'March 2026',
		thumbnail: '1.jpg',
		photos: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'],
		description: `I created this piece as a part of my 3D design art class. Our final project was to design a cohesive three-piece furniture set that combines both form and function, and then build the piece in real life at a smaller scale. The overall bean-theme I came up with is based on the bean part of beanbags. The set centers around the round, kidney bean chair. This chair is accompanied with a footstool, which is designed to look like peas in a pod. The final piece is a cylindrical side table shaped like a can of baked beans. I used Blender to model the chair and footstool and 3D-printed them in my school's makerspace. The side table was made from layers of laser-cut wood stacked together. I painted the chair and footstool and added a digitally drawn bean label to the table. I wanted the furniture set to be unique, playful, and whimsical. Overall, I really enjoyed designing and building this! :)`,
	},
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
		date: 'December 2024',
		thumbnail: '1.png',
		photos: ['1.png','2.png','3.png','4.png','5.png'],
		description: `Last summer, I went on a life-changing backpacking journey along the Pacific Crest Trail (<a href="https://trail.hackclub.com/" target="_blank" rel="noopener">the website</a> and <a href="https://www.youtube.com/watch?v=ufMUJ9D1fi8" target="_blank" rel="noopener">the documentary</a>). Over the course of a week, I hiked a total of 30 miles alongside 29 other teenagers from 9 countries and 15 states.\n\nOur group leader, Thomas, stood out to me for his constant kindness and encouragement. When he shared his plans to travel to Japan, I decided to gift my Tales from the Trail book to him! This handcrafted book is a collection of the fun, struggles, friendships, and everything in between that defined our journey. The process of bringing this book to life was as rewarding as the hike itself!\n\nI wrote the pages and planned the sequence to create a smooth flow between the beautiful nature, the amazing people I met, the fun times I had with them, and the challenges I faced. Each page represents a piece of our story. I designed the layout to make a balance of pictures, drawings, words, and 3D elements. I experimented with many techniques, like cutting and folding pop-ups, crafting paper sculptures, and layering textures. Some of my favorite parts are the huge scary bear pop-up, the realistic crawfish paper model, the book spine decorated with pink Himalayan salt and river rocks, the 3D toilet with poop made of brown leather, the page of paper flowers, and the campfire pop-up.`,
		link: 'https://docs.google.com/presentation/d/10uJnXMQ8QBkAP3cAIPET5hN4jJUoEL9lMYbe5iTUSe0/edit?usp=sharing',
	},
	{
		id: 'chewonthis',
		title: 'Chew on This',
		date: 'November 2024',
		thumbnail: '1.png',
		photos: ['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png'],
		description: `Chew on This is a miniature room I created from gum boxes, gum wrappers, and gum itself. The idea came to me one day while studying and chewing gum. I was surprised that gum was actually really nice to work with; it could be sculpted, and its stickiness could be like a glue to hold the room together. At the center of this tiny world is the "person", an unchewed stick of gum sleeping in a bed made from a folded gum box. This person, untouched and fresh, is in contrast to the rest of the room, where everything else has been reshaped. This gum-person symbolizes openness and potential.\n\nSurrounding this figure is a room with tons of detail. I sculpted objects like the teddy bear sleeping next to the gum-person, the cat hiding under the bed, and the dirt in the plant pot using softened gum. I mixed gum with water to soften it. The entire floor is made from gum. Gum wrappers were folded into a blanket, cut into tiny clothes in the closet, and made into a rug by the bed, and items like the laptop screen, the phone, and the trash can. To make the room more interesting, I added some accessories: a guitar hanging on the wall, a clock above it, posters and artwork decorating the walls, a fishbowl on the shelves, the charging cord for the phone and potted plants.\n\nThe fresh gum-person is a symbol of possibilities in a place where everything else has been transformed. The project became a reflection on potential, a reminder that art can be made from ordinary materials if we look at them in a new way and if we allow random thoughts to entertain us.`,
	},
];
