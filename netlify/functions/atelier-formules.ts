import { resourceHandler } from '../../lib/server/crud';
import { COLLECTIONS } from '../../lib/server/models';

export const handler = resourceHandler({
  name: COLLECTIONS.atelierFormules,
  sort: { order_index: 1 },
  slugField: 'slug',
  activeFilter: true,
  inactiveParam: 'includeInactive',
});
