import type { PageLoad } from './$types';
export const load: PageLoad = ({ params }) => ({ adventureId: params.id });
