export interface Adventure {
	id: string;
	title: string;
	date: string;
	image: string;
	description: string;
}

export const adventures: Adventure[] = [
	{
		id: 'undercity',
		title: 'Undercity',
		date: 'July 11th to 14th, 2025',
		image: '/content/postcards/undercity.png',
		description: 'Undercity was a 4-day hardware hackathon @ GitHub HQ that happened July 11-14, 2025! It was hosted by Hack Club, for teenagers worldwide. To get in, I built a PCB macropad called the Frogpad. At the event, I was in a team and we built a small game console with sliders that can play pong, breakout, and draw. It was such a great experience!',
	},
	{
		id: 'juice',
		title: 'Juice',
		date: 'April 4th to 11th, 2025',
		image: '/content/postcards/juice.png',
		description: 'The Juice popup cafe was a two month online game jam followed by an in-person popup hacker cafe in Shanghai, China. Over 90 teenagers from 23 countries flew to Shanghai, China to present their games in our popup cafe and juice a bunch of fruits to give to the locals as they tried their game. I helped organize this event as the lead designer. I drew all the assets on the website, which helped Juice receive 2000 signups. For this event, I made the Signal Lost game. Juice was an amazing experience!',
	},
	{
		id: 'counterspell',
		title: 'Counterspell',
		date: 'November 23rd, 2024',
		image: '/content/postcards/counterspell.png',
		description: "Counterspell was a beginner-friendly game jam for highschoolers that happened in more than 50 cities all over the world on November 23rd and 24th as part of Hack Club. Teenager coders came together to build apps and games! I helped organize Counterspell Boston, planning and hosting the event at the Microsoft NERD Center on November 23rd. This was the second event I've helped organize and it was a great experience overall! I got to learn more about the process of finding venues, finding sponsors to raise money, and advertising to get attendees! We received over 85 sign-ups. The theme of the hackathon was You are Your Own Enemy. I had a great time meeting all the amazing people who came and building a project using pygame!",
	},
	{
		id: 'ascend',
		title: 'Ascend',
		date: 'November 15th to 17th, 2024',
		image: '/content/postcards/ascend.png',
		description: 'Ascend was the biggest teenage female tech summit! It was part of the Days of Service initiative, under Hack Club. The hackathon was hosted at SpaceX in Los Angeles from November 15th to 17th! There were 50 girls, selected from applications, from more than 5 different countries and 10 states! We spent the weekend experiencing technical workshops and meeting other girls and women leaders in tech as we created coding projects! I worked on a project using A-Frame with Eesha and Ishika. Ascend was such a great experience and I got to learn so much!!',
	},
	{
		id: 'celestial',
		title: 'Celestial',
		date: 'October 19th, 2024',
		image: '/content/postcards/celestial.png',
		description: 'After the Trail, I discovered a branch of Hack Club called Days of Service, an initiative to support girls in coding. Thanks to the Hack Club cofounder Christina and the event manager Zenab, I got to travel to Toronto and help organize an event called Celestial. Celestial was a one-day hackathon on October 19th in Toronto at Shopify. We met weekly months before to find venues, design merch, advertise, and find leading women in tech to be mentors. There were two workshops, PCB and 3D modeling. I helped run the PCB workshop. I also designed some of the stickers. On the 18th, I flew from Boston to Toronto and met up with the other Celestial organizers! It was so cool to finally see them in person. We also got to attend a dinner with ten women leaders in tech and learned a lot from their experiences! I noticed a common theme of what they said was to not ask for permission and to take risks! Overall, helping organize Celestial and being able to travel to Toronto to meet so many cool people was a great experience. I got to learn so much and meet a ton of amazing people!',
	},
	{
		id: 'trail',
		title: 'The Trail',
		date: 'July 12th to 19th, 2024',
		image: '/content/postcards/trail.png',
		description: 'From July 11, 2024 to July 20, 2024, I went on a life-changing trip on the Pacific Crest Trail, a 2650 mile long trail from Mexico to Canada. Over the course of a week, I hiked 30 miles alongside 29 teenage hackers from 9 different countries and 15 states! This event was organized by Hack Club, community of over 34,000 teenage makers and creators! This adventure followed the month long PCB hackathon, where people worked together to design printed circuit boards to use on the hike, like walkie talkies and flashlights. The Trail was an adventure of a lifetime.',
	},
];
