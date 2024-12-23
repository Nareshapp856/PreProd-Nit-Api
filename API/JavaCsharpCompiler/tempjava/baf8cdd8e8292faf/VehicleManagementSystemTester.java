class Vehicle{
	String brand;
	String model;
	int year;
	public Vehicle(String brand, String model, int year) {
		super();
		this.brand = brand;
		this.model = model;
		this.year = year;
	}
	public void displayInfo() {
		System.out.println("brand of vehicle--"+this.brand);
		System.out.println("model of vehicle --"+this.model);
		System.out.println("year of manufacturing--"+this.year);
	}
}
class car extends Vehicle{
	int numDoors;

	public car(String brand, String model, int year, int numDoors) {
		super(brand, model, year);
		this.numDoors = numDoors;
	}
	public void carDetails() {
	super.displayInfo();
	System.out.println("numbers of doors in veh--"+this.numDoors);
	}
}
class ElectricCar extends car{
	int batteryCapacity;

	public ElectricCar(String brand, String model, int year, int numDoors, int batteryCapacity) {
		super(brand, model, year, numDoors);
		this.batteryCapacity = batteryCapacity;
	}
	public void ElectricCardetails() {
	super.carDetails();
	System.out.println("bateer capacity is-"+this.batteryCapacity+"kwh");
}}

public class VehicleManagementSystemTester {
    public static void main(String []args) {
    	car c1=new car("tata","safari", 2015, 5);
    	c1.carDetails();
    	ElectricCar e1=new ElectricCar("audi", "q7", 2018, 6, 400);
    	e1.ElectricCardetails();
    }
}
