from django.db import models

class CountryCodeAndCountryName(models.Model):
    country_code = models.CharField(max_length=255, blank=True, null=False)
    country_name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.country_name} ({self.country_code})"

class CityAndCountryCode(models.Model):
    country_code = models.CharField(max_length=255, blank=True, null=False)
    city = models.CharField(max_length=255, blank=True, null=True)
    country = models.ForeignKey(
        "CountryCodeAndCountryName",  # Связываем с другой моделью
        on_delete=models.CASCADE,
        related_name="cities",  # Название обратной связи
        blank=True,
        null=True
    )
    def __str__(self):
        return f"{self.country_code} ({self.city})"