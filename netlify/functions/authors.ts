import { resourceHandler } from '../../lib/server/crud';
import { COLLECTIONS } from '../../lib/server/models';

// Authors have no `active` flag; sorted by name.
export const handler = resourceHandler({
  name: COLLECTIONS.authors,
  sort: { name: 1 },
});
