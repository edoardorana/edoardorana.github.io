import { parseRoute } from './data.mjs';

const landingSections = new Set(['progetti', 'approccio', 'contatti']);

export function resolveView(hash = '') {
  const route = parseRoute(hash);

  if (route.page === 'mappa') return { kind: 'landing', section: 'home' };
  if (route.page === 'profilo' || route.page === 'percorso') return { kind: 'landing', section: 'profilo' };
  if (route.page === 'progetti' && route.item) return { kind: 'project', item: route.item };
  if (landingSections.has(route.page)) return { kind: 'landing', section: route.page };

  return { kind: 'not-found' };
}
