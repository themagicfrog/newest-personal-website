export interface Album {
	id: string;
	title: string;
	photos: string[];
}

export const albums: Album[] = [
	{
		id: 'highlights',
		title: 'highlights',
		photos: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg']
	},
	{
		id: 'tellpeopleyoulovethem',
		title: 'tell people you love them',
		photos: ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg']
	},
	{
		id: 'duality',
		title: 'duality',
		photos: ['1.png','2.png','3.png','4.png','5.png','6.png']
	}
];
