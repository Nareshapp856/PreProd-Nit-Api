class Vehicle
{
	public String brand;
	public String modal;
	public int year;
	
	public Vehicle(String brand, String modal, int year)
	{
		this.brand=brand;
		this.modal=modal;
		this.year=year;
	}
	
	public void displayInfo()
	{
		System.out.println("Vehicle brand: "+brand);
		System.out.println("Vehicle modal: "+modal);
		System.out.println("Vehicle year: "+year);
	}
}

class Car extends Vehicle
{
	public int numDoors;
	
	public Car(String brand, String modal, int year, int numDoors)
	{
		super(brand, modal, year);
		this.numDoors=numDoors;
	}
	
	public void carDetails()
	{
		System.out.println("car brand: "+brand);
		System.out.println("car modal: "+modal);
		System.out.println("car year: "+year);
		System.out.println("car numDoors: "+numDoors);
	}
}

class ElectricCar extends Car
{
	public int batteryCapacity;
	
	public ElectricCar(String brand, String modal, int year, int numDoors,int batteryCapacity)
	{
		super(brand, modal, year,numDoors);
		this.batteryCapacity=batteryCapacity;
	}
	
	public void electricCarDetails()
	{
		System.out.println("ElectricCar brand: "+brand);
		System.out.println("ElectricCar modal: "+modal);
		System.out.println("ElectricCar year: "+year);
		System.out.println("ElectricCar numDoors: "+numDoors);
		System.out.println("ElectricCar batterycapacity: "+batteryCapacity+" %");
		//System.out.println("ElectricCar numDoors: "+numDoors);
	}
}


public class VehicleManagerSystemTester {

	public static void main(String[] args) 
	{
		ElectricCar ec = new ElectricCar("TATA","NENO",2010,5,90);
		ec.displayInfo();
		System.out.println("=================================");
		ec.carDetails();
		System.out.println("=================================");
		ec.electricCarDetails();
		

	}

}