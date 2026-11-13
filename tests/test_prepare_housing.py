import importlib.util
from pathlib import Path
import unittest
import pandas as pd

spec = importlib.util.spec_from_file_location('prepare', Path(__file__).resolve().parents[1] / 'scripts/prepare_housing.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class HousingPreparation(unittest.TestCase):
    def test_scalar(self):
        self.assertEqual(module.scalar('€ 1.234.567,50', 'price'), 1234567.5)
        self.assertEqual(module.scalar('125 m²', 'area'), 125)
        self.assertEqual(module.scalar('125 m² - Vedi dettaglio', 'area'), 125)
        for value in ['50 - 100 m²', '0 m²', 'unknown']:
            self.assertIsNone(module.scalar(value, 'area'))
        self.assertIsNone(module.scalar('Prezzo su richiesta', 'price'))
        self.assertEqual(module.scalar('1234567,50', 'price'), 1234567.5)
        self.assertIsNone(module.scalar('1234.567', 'price'))
        self.assertIsNone(module.scalar('9' * 400, 'price'))

    def test_exclusions_privacy_and_missing(self):
        base = {'link_id':'private-id', 'contratto':'Vendita', 'tipologia':'Appartamento', 'zona':'via privata 1', 'superficie':'50 m²', 'prezzo':'€ 100.000', 'locali':'2 camere da letto', 'titolo':'Private title'}
        rows = [base, base, dict(base, link_id='auction', Procedura='Asta'), dict(base, link_id='other', prezzo='Prezzo su richiesta')]
        result, counts = module.extract(pd.DataFrame(rows), {'Centro'})
        self.assertEqual(counts, {'duplicate_identifier':1, 'auction':1})
        self.assertEqual(len(result),2)
        self.assertIsNone(result[0]['zone'])
        self.assertIsNone(result[0]['rooms'])
        self.assertIsNone(result[1]['price'])
        self.assertNotIn('titolo', result[0])
        self.assertNotEqual(result[0]['id'],'private-id')

if __name__ == '__main__':
    unittest.main()
