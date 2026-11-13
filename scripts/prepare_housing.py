"""Build the public historical dataset from local R archives; never copy raw data.

Usage: python scripts/prepare_housing.py /path/to/frame.RData --comparison /path/to/immobiliare_finale.RData
Install dependencies from scripts/requirements-data.txt in a local virtual environment.
"""
import argparse
import hashlib
import json
import math
import re
from collections import Counter
from pathlib import Path

import pandas as pd
import pyreadr

ROOT = Path(__file__).resolve().parents[1]
STATES = {'Ottimo / Ristrutturato', 'Buono / Abitabile', 'Nuovo / In costruzione', 'Da ristrutturare'}
TYPES = {'Appartamento', 'Loft', 'Attico', 'Villa unifamiliare', 'Mansarda', 'Villa a schiera', 'Terratetto unifamiliare', 'Open space', 'Villa bifamiliare', 'Villa plurifamiliare', 'Terratetto plurifamiliare', 'Appartamento in villa', 'Attico - Mansarda', 'Villa', 'Cascina', 'Soffitta', 'Casa indipendente', 'Rustico'}

def text(value):
    return '' if pd.isna(value) else str(value).strip()

def scalar(value, unit):
    """Only a single positive Italian-formatted amount; ranges stay missing."""
    value = text(value)
    if unit == 'area':
        value = re.sub(r'\s*-\s*Vedi dettaglio$', '', value)
    amount = r'(\d{1,3}(?:\.\d{3})+|\d+)(,\d+)?'
    pattern = rf'(?:€\s*)?{amount}' if unit == 'price' else rf'{amount}\s*m[²2]'
    match = re.fullmatch(pattern, value)
    if not match:
        return None
    result = float((match[1] + (match[2] or '')).replace('.', '').replace(',', '.'))
    return result if math.isfinite(result) and result > 0 else None

def extract(frame, zones):
    records, reasons, seen = [], Counter(), set()
    for raw in frame.to_dict('records'):
        identifier = text(raw.get('link_id'))
        if not identifier:
            reasons['missing_identifier'] += 1
            continue
        if identifier in seen:
            reasons['duplicate_identifier'] += 1
            continue
        seen.add(identifier)
        if text(raw.get('Procedura')) or text(raw.get('stato')) in {'Partecipabile', 'Non partecipabile'} or text(raw.get('Tipo.vendita')):
            reasons['auction'] += 1
            continue
        if not text(raw.get('contratto')).startswith('Vendita'):
            reasons['not_sale'] += 1
            continue
        kind = text(raw.get('tipologia'))
        if kind not in TYPES:
            reasons['not_residential_or_unknown_type'] += 1
            continue
        area = scalar(raw.get('superficie'), 'area')
        if area is None and not text(raw.get('superficie')):
            area = scalar(raw.get('super'), 'area')
        price = scalar(raw.get('prezzo'), 'price')
        rooms = text(raw.get('locals'))
        if rooms not in {'1', '2', '3', '4', '5', '5+'}:
            # Only explicit "locale", never infer rooms from the bedroom count.
            match = re.match(r'^(\d\+?) local[ei]\b', text(raw.get('locali')))
            rooms = match[1] if match and match[1] in {'1','2','3','4','5','5+'} else None
        energy = re.match(r'^(A[1-4+]?|[B-G])(?:\s|$)', text(raw.get('Efficienza.energetica')) or text(raw.get('Efficienza energetica')))
        zone = text(raw.get('zona'))
        state = text(raw.get('stato'))
        sqm = price / area if price and area else None
        flags = []
        if price is not None and not 5000 <= price <= 50_000_000: flags.append('price')
        if area is not None and not 10 <= area <= 2000: flags.append('area')
        if sqm is not None and not 200 <= sqm <= 50000: flags.append('price_sqm')
        records.append({'id': f'MI21-{len(records)+1:05d}', 'zone': zone if zone in zones else None,
                        'type': kind, 'condition': state if state in STATES else None,
                        'area': area, 'price': price, 'rooms': rooms,
                        'energy': energy[1] if energy else None, 'flagged': bool(flags)})
    return records, dict(reasons)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('source', type=Path)
    parser.add_argument('--comparison', type=Path)
    args = parser.parse_args()
    frame = pyreadr.read_r(str(args.source))['frame']
    zones = set(json.loads((ROOT / 'scripts/housing-zones.json').read_text(encoding='utf-8')))
    records, exclusions = extract(frame, zones)
    report = {'archive_year': 2021, 'source_rows': len(frame), 'source_columns': len(frame.columns),
              'source_sha256': hashlib.sha256(args.source.read_bytes()).hexdigest(),
              'published_rows': len(records), 'excluded': exclusions,
              'flagged_rows': sum(r['flagged'] for r in records),
              'missing': {k: sum(r[k] is None for r in records) for k in ['zone','condition','area','price','rooms','energy']}}
    if args.comparison:
        other = pyreadr.read_r(str(args.comparison))['data3']
        report['comparison'] = {'rows': len(other), 'columns': len(other.columns), 'shared_identifiers': len(set(frame.link_id) & set(other.link_id)), 'used_for_publication': False}
    output = ROOT / 'proposal/housing'
    output.mkdir(exist_ok=True)
    (output / 'milano-2021.json').write_text(json.dumps({'metadata': report, 'records': records}, ensure_ascii=False, separators=(',', ':'), allow_nan=False), encoding='utf-8')
    (ROOT / 'docs/housing-quality.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps(report, indent=2))

if __name__ == '__main__':
    main()
