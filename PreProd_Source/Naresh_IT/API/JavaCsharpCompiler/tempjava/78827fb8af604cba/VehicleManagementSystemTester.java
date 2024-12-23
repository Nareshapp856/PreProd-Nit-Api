Vehicle Management System


// Vehicle class
class Vehicle {
    private String brand;
    private String model;
    private int year;

    public Vehicle() {
        this.brand = "Unknown";
        this.model = "Unknown";
        this.year = 0;
    }

    public Vehicle(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    public void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
    }
}

// Car class
class Car extends Vehicle {
    private int numDoors;

    public Car() {
        super();
        this.numDoors = 0;
    }

    public Car(String brand, String model, int year, int numDoors) {
        super(brand, model, year);
        this.numDoors = numDoors;
    }

    public void carDetails() {
        displayInfo();
        System.out.println("Number of Doors: " + numDoors);
    }
}

// ElectricCar class
class ElectricCar extends Car {
    private int batteryCapacity;

    public ElectricCar() {
        super();
        this.batteryCapacity = 0;
    }

    public ElectricCar(String brand, String model, int year, int numDoors, int batteryCapacity) {
        super(brand, model, year, numDoors);
        this.batteryCapacity = batteryCapacity;
    }

    public void electricCarDetails() {
        carDetails();
        System.out.println("Battery Capacity: " + batteryCapacity + " kWh");
    }
}

// VehicleManagementSystemTester class
public class VehicleManagementSystemTester {
    public static void main(String[] args) {
        ElectricCar electricCar = new ElectricCar("Tesla", "Model S", 2022, 4, 100);

        electricCar
