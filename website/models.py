from django.db import models

# Create your models here.

from django.db import models



class Product(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name


class Car(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    brand = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    year = models.IntegerField()
    color = models.CharField(max_length=255);


    def __str__(self):
        return self.brand


class Shirt(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    lenght = models.CharField(max_length=255)
    size = models.FloatField()
    color = models.CharField(max_length=255)

    def __str__(self):
        return self.lenght
