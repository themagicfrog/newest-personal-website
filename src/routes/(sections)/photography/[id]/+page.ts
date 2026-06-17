import type { PageLoad } from './$types';
export const load: PageLoad = ({ params }) => ({ albumId: params.id });
