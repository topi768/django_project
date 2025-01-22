from django.test import TestCase

class BasicTestCase(TestCase):
    def test_addition(self):
        """Проверка, что 2 + 2 = 4"""
        self.assertEqual(2 + 2, 4)
