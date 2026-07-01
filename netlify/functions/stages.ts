import { resourceHandler } from '../../lib/server/crud';
import { COLLECTIONS } from '../../lib/server/models';

export const handler = resourceHandler({
  name: COLLECTIONS.stages,
  sort: { order_index: 1 },
  slugField: 'reservation_slug',
  activeFilter: true,
  inactiveParam: 'includeInactive',
});
