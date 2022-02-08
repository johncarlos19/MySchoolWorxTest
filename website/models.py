from django.db import models

# Create your models here.

from django.db import models



class Product(models.Model):
    typename = models.CharField(max_length=200)
    def __str__(self):
        return self.typename


class Car(Product):

    brand = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    year = models.IntegerField()
    color = models.CharField(max_length=255);
    # typename = "Car"


    def __str__(self):

        return self.brand




class Shirt(Product):
    lenght = models.CharField(max_length=255)
    size = models.FloatField()
    color = models.CharField(max_length=255)
    # __typename = "Shirt"
    def __str__(self):
        return self.color


