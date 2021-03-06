import graphene
from graphene_django import DjangoObjectType
from .models import *



class ProductType(DjangoObjectType):
    # shirt_list = graphene.List(graphene.NonNull(graphene.String))
    # car_list = graphene.List(graphene.NonNull(graphene.String))
    class Meta:
        model = Product
        # fields =


    # def  resolve_shirt_list(self, info):
    #     return [shirt.shirt for shirt in self.shirts.all()]
    #
    # def  resolve_car_list(self, info):
    #     return [car.car for car in self.cars.all()]


class CarType(DjangoObjectType):
    class Meta:
        model = Car


class ShirtType(DjangoObjectType):
    class Meta:
        model = Shirt




class UpdateCar(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
        brand = graphene.String()
        model = graphene.String()
        color = graphene.String()
        year = graphene.Int()

    statu = graphene.String()
    car = graphene.Field(lambda: CarType)

    def mutate(self, info, id, brand, model, color, year):
        if id is not None:
            car = Car.objects.get(id=id)
            car.color = color
            car.brand = brand
            car.model = model
            car.year = year
            car.save()
            statu = "Updated"
            return UpdateCar(car=car, statu=statu)
        else:
            return UpdateCar(car=None, statu="Error")




class CreateCar(graphene.Mutation):
    class Arguments:
        brand = graphene.String()
        model = graphene.String()
        color = graphene.String()
        year = graphene.Int()

    statu = graphene.String()
    car = graphene.Field(lambda: CarType)

    def mutate(self, info, brand, model, color, year):
        car = Car(color=color, brand=brand, model=model, year=year, typename="Car")
        car.save()
        statu = "Created"
        return CreateCar(car=car, statu=statu)


class CreateShirt(graphene.Mutation):
    class Arguments:
        lenght = graphene.String()
        color = graphene.String()
        size = graphene.Float()

    statu = graphene.String()
    shirt = graphene.Field(lambda: ShirtType)

    def mutate(self, info, lenght, color, size):
        shirt = Shirt(color=color, lenght=lenght, size=size, typename="Shirt")
        shirt.save()
        statu = "Created"
        return CreateShirt(shirt=shirt, statu=statu)



class UpdateShirt(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
        lenght = graphene.String()
        color = graphene.String()
        size = graphene.Float()

    statu = graphene.String()
    shirt = graphene.Field(lambda: ShirtType)

    def mutate(self, info, id, lenght, color, size):
        if id is not None:
            shirt = Shirt.objects.get(id=id)
            shirt.color = color
            shirt.lenght = lenght
            shirt.size = size
            shirt.save()
            statu = "Updated"
            return UpdateShirt(shirt=shirt, statu=statu)
        else:
            return UpdateShirt(shirt=None, statu="Error")




class Query(graphene.ObjectType):

    products = graphene.List(graphene.NonNull(ProductType))
    getProduct = graphene.Field(ProductType, id=graphene.Int())
    getShirt = graphene.Field(ShirtType, id=graphene.Int())
    getCar = graphene.Field(CarType, id=graphene.Int())
    cars = graphene.List(graphene.NonNull(CarType))
    # getCar = graphene.ObjectType(graphene.NonNull(CarType))
    shirts = graphene.List(graphene.NonNull(ShirtType))
    # getShirt = graphene.ObjectType(graphene.NonNull(ShirtType))

    def resolve_products(self, info, **kwargs):
        return Product.objects.all()
    def resolve_getProduct(self, info, id, **kwargs):
        if id is not None:
            return Product.objects.get(id=id)
    def resolve_getCar(self, info, id, **kwargs):
        if id is not None:
            return Car.objects.get(id=id)
    def resolve_getShirt(self, info, id, **kwargs):
        if id is not None:
            return Shirt.objects.get(id=id)

    def resolve_cars(self, info, **kwargs):
        return Car.objects.all()

    def resolve_shirts(self, info, **kwargs):
        return Shirt.objects.all()


class Mutation(graphene.ObjectType):
    create_car = CreateCar.Field()
    update_car = UpdateCar.Field()
    create_shirt = CreateShirt.Field()
    update_shirt = UpdateShirt.Field()





