from abc import ABC, abstractmethod

class Stage(ABC):
    
    def run(self):
        extract = self.extract()
        transform = self.transform(extract)
        load = self.load(transform)
        return

    @abstractmethod
    def extract(self):
        pass

    @abstractmethod
    def transform(self):
        pass

    @abstractmethod
    def load(self):
        pass