
class Car(object):

    id = None
    brand =None
    model = None
    year =None
    color =None

    def __init__(self, brand, model, year, color):
        self.brand = brand
        self.model = model
        self.year = year
        self.color = color