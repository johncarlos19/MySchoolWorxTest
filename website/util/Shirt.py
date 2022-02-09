from django.template.defaultfilters import length


class Shirt(object):

    id = None
    length =None
    size = None
    color =None

    def __init__(self, length, size, color):
        self.length = length
        self.size = size
        self.color = color

