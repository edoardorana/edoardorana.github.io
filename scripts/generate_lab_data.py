"""Generate and validate a deterministic, entirely synthetic sales-listing snapshot.

Only the generated_at metadata changes between runs unless --generated-at is set.
No network access, scraped data, or third-party Python packages are used.
"""

from __future__ import annotations

import argparse
from datetime import date, datetime, timedelta, timezone
import json
import math
from pathlib import Path
import random


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "proposal" / "lab" / "annunci-demo.json"
SNAPSHOT_END = date(2026, 10, 18)
DEFAULT_SEED = 20261018
DEFAULT_COUNT = 720
ZONES = (
    ("Zona A", 3900),
    ("Zona B", 3350),
    ("Zona C", 3050),
    ("Zona D", 2750),
    ("Zona E", 2500),
    ("Zona F", 2200),
)
TYPES = (
    ("Monolocale", 28, 58, 1.10),
    ("Bilocale", 48, 87, 1.04),
    ("Trilocale", 72, 120, 1.00),
    ("Quadrilocale", 105, 170, 0.96),
    ("Loft", 55, 145, 1.08),
)


def generate(count: int, seed: int, generated_at: str) -> dict:
    if not 500 <= count <= 1000:
        raise ValueError("Il dataset demo deve avere tra 500 e 1.000 annunci")
    rng = random.Random(seed)
    records = []
    for index in range(1, count + 1):
        zone, base_price_sqm = rng.choice(ZONES)
        kind, minimum, maximum, kind_factor = rng.choice(TYPES)
        area = rng.randint(minimum, maximum)
        variability = rng.uniform(0.78, 1.22)
        price = round(area * base_price_sqm * kind_factor * variability / 1000) * 1000
        published = SNAPSHOT_END - timedelta(days=rng.randint(0, 240))
        records.append(
            {
                "id": f"DEMO-{index:04d}",
                "zone": zone,
                "type": kind,
                "surface_sqm": area,
                "asking_price_eur": price,
                "listed_at": published.isoformat(),
            }
        )
    return {
        "schema_version": "1.0",
        "origin": "Generatore sintetico WEB-CV; nessuna fonte immobiliare reale",
        "synthetic": True,
        "transaction": "sale",
        "generated_at": generated_at,
        "seed": seed,
        "records": records,
    }


def validate(payload: object) -> int:
    if not isinstance(payload, dict):
        raise ValueError("Il documento deve essere un oggetto JSON")
    if payload.get("schema_version") != "1.0":
        raise ValueError("Versione dello schema non supportata")
    if not isinstance(payload.get("origin"), str) or not payload["origin"].strip():
        raise ValueError("Origine mancante")
    if payload.get("synthetic") is not True:
        raise ValueError("Il generatore demo accetta solo dati sintetici")
    if payload.get("transaction") != "sale":
        raise ValueError("Il dataset demo include solo annunci di vendita")
    if not isinstance(payload.get("seed"), int):
        raise ValueError("Seed mancante o non valido")
    try:
        datetime.strptime(payload["generated_at"], "%Y-%m-%dT%H:%M:%SZ")
    except (KeyError, AttributeError, ValueError) as exc:
        raise ValueError("Data di generazione non valida") from exc
    records = payload.get("records")
    if not isinstance(records, list):
        raise ValueError("Elenco annunci mancante")
    ids: set[str] = set()
    for number, record in enumerate(records, start=1):
        if not isinstance(record, dict):
            raise ValueError(f"Annuncio {number}: formato non valido")
        identifier = record.get("id")
        if not isinstance(identifier, str) or not identifier.strip() or identifier in ids:
            raise ValueError(f"Annuncio {number}: ID mancante o duplicato")
        ids.add(identifier)
        for key in ("zone", "type"):
            if not isinstance(record.get(key), str) or not record[key].strip():
                raise ValueError(f"Annuncio {number}: {key} mancante")
        for key in ("surface_sqm", "asking_price_eur"):
            value = record.get(key)
            if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or value <= 0:
                raise ValueError(f"Annuncio {number}: {key} non valido")
        try:
            date.fromisoformat(record["listed_at"])
        except (KeyError, TypeError, ValueError) as exc:
            raise ValueError(f"Annuncio {number}: data non valida") from exc
    return len(records)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--count", type=int, default=DEFAULT_COUNT)
    parser.add_argument("--seed", type=int, default=DEFAULT_SEED)
    parser.add_argument("--generated-at", help="Timestamp UTC ISO 8601, per una build byte-identica")
    parser.add_argument("--check", action="store_true", help="Valida il JSON esistente senza modificarlo")
    args = parser.parse_args()
    if args.check:
        count = validate(json.loads(args.output.read_text(encoding="utf-8")))
        print(f"Dataset valido: {count} annunci")
        return
    generated_at = args.generated_at or datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
    payload = generate(args.count, args.seed, generated_at)
    validate(payload)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Dataset generato: {len(payload['records'])} annunci in {args.output}")


if __name__ == "__main__":
    main()
