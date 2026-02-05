class Car {
  #brand;
  #model;
  speed = 0;
  isTruckOpen = false;
  isCarMoving = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk Open: ${this.isTruckOpen}`);
  }

  go() {
    if (this.speed <= 200 & this.isTruckOpen !== true) {
      this.speed = this.speed + 5;
      this.isCarMoving = true;
    }
  }

  break() {
    if (this.speed >= 0) {
      this.speed = this.speed - 5;
      this.isCarMoving = false;
    }
  }

  openTruck() {
    if (this.isCarMoving === false) {
      this.isTruckOpen = true;
    }
  }

  closeTruck() {
    this.isTruckOpen = false;
  }
}

const toyota = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const tesla = new Car({
  brand: 'Tesla', 
  model: 'Model 3'
});

console.log(toyota);
console.log(tesla);

toyota.go();
toyota.go();
tesla.go();
tesla.go();
toyota.break();
tesla.break();
tesla.openTruck();
tesla.closeTruck();

toyota.displayInfo();
tesla.displayInfo();

class RaceCar extends Car {
  accelaration;

  constructor(carDetails) {
    super(carDetails);
    this.accelaration = carDetails.accelaration;
  }

  go() {
    if (this.speed <= 300 & this.isTruckOpen !== true) {
      this.speed = this.speed + this.accelaration;
      this.isCarMoving = true;
    }
  }

  openTruck() {
    this.isTruckOpen = false;
  }
}

const mcLaren = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  accelaration: 20
});

mcLaren.go();
mcLaren.go();
mcLaren.break();
mcLaren.openTruck();
mcLaren.displayInfo();