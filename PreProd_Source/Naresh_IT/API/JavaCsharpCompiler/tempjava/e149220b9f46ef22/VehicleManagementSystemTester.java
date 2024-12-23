import java.util.Scanner;

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

    public String getBrand() {
        return brand;
    }

    public String getModel() {
        return model;
    }

    public int getYear() {
        return year;
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

    public int getNumDoors() {
        return numDoors;
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

    public int getBatteryCapacity() {
        return batteryCapacity;
    }
}

// VehicleManagementSystemTester class
public class VehicleManagementSystemTester {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter Electric Car Brand: ");
        String brand = scanner.nextLine();

        System.out.print("Enter Electric Car Model: ");
        String model = scanner.nextLine();

        System.out.print("Enter Electric Car Year: ");
        int year = scanner.nextInt();
        scanner.nextLine(); // Consume newline left-over

        System.out.print("Enter Electric Car Number of Doors: ");
        int numDoors = scanner.nextInt();
        scanner.nextLine(); // Consume newline left-over

        System.out.print("Enter Electric Car Battery Capacity (kWh): ");
        int batteryCapacity = scanner.nextInt();
        scanner.nextLine(); // Consume newline left-over

        ElectricCar electricCar = new ElectricCar(brand, model, year, numDoors, batteryCapacity);

        System.out.println("\nElectric Car Details:");
        electricCar.electricCarDetails();
    }
}


