const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIMESTAMP_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

function validDate(value) {
  if (typeof value !== 'string' || !DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function validRecord(record, ids) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return false;
  const { id, zone, type, surface_sqm: area, asking_price_eur: price, listed_at: date } = record;
  if (![id, zone, type].every(value => typeof value === 'string' && value.trim().length > 0)) return false;
  if (ids.has(id) || !Number.isFinite(area) || area <= 0 || !Number.isFinite(price) || price <= 0) return false;
  return validDate(date);
}

export function validateDataset(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('Documento JSON non valido.');
  if (payload.schema_version !== '1.0') throw new Error('Versione dello schema non supportata.');
  if (typeof payload.origin !== 'string' || !payload.origin.trim()) throw new Error('Origine dei dati mancante.');
  if (typeof payload.synthetic !== 'boolean') throw new Error('Indicazione di dati sintetici mancante.');
  if (payload.transaction !== 'sale') throw new Error('Sono supportati solo annunci di vendita.');
  if (typeof payload.generated_at !== 'string' || !TIMESTAMP_PATTERN.test(payload.generated_at) ||
      Number.isNaN(Date.parse(payload.generated_at)) || new Date(payload.generated_at).toISOString().replace('.000Z', 'Z') !== payload.generated_at) {
    throw new Error('Data di generazione non valida.');
  }
  if (!Array.isArray(payload.records)) throw new Error('Elenco degli annunci mancante.');

  const ids = new Set();
  const records = [];
  let invalidCount = 0;
  for (const record of payload.records) {
    if (!validRecord(record, ids)) {
      invalidCount += 1;
      continue;
    }
    ids.add(record.id);
    records.push(record);
  }
  return {
    metadata: {
      schemaVersion: payload.schema_version,
      origin: payload.origin,
      synthetic: payload.synthetic,
      transaction: payload.transaction,
      generatedAt: payload.generated_at,
    },
    records,
    invalidCount,
  };
}

export async function loadDataset(url = new URL('./annunci-demo.json', import.meta.url), { signal, fetcher = fetch } = {}) {
  let response;
  try {
    response = await fetcher(url, { signal, cache: 'no-store' });
  } catch (error) {
    if (error?.name === 'AbortError') throw error;
    throw new Error('Impossibile recuperare il dataset. Riprova più tardi.', { cause: error });
  }
  if (!response.ok) throw new Error(`Dataset non disponibile (HTTP ${response.status}).`);
  try {
    return validateDataset(await response.json());
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error('Il dataset non contiene JSON valido.', { cause: error });
    throw error;
  }
}
