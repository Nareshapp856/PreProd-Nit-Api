
    class vehicle{
	String brand;
	String model;
	int year;
	public vehicle(String brand,String model,int year) {
		this.brand=brand;
		this.model=model;
		this.year=year;
	}	
	public void displayInfo(){
		System.out.println("Brand:"+brand);
		System.out.println("Model:"+model);
		System.out.println("year:"+year);		
	}
}
class car extends vehicle{
	int numOfDoors;

	public car(String brand, String model, int year, int numOfDoors) {
		super(brand, model, year);
		this.numOfDoors = numOfDoors;
	}
	public void carDeatils() {
		super.displayInfo();
		System.out.println("Number of doors:"+numOfDoors);
	}
}
class electricalCar extends car{
	int  batteryCapacity;

	public electricalCar(String brand, String model, int year, int numOfDoors) {
		super(brand, model, year, numOfDoors);
		// TODO Auto-generated constructor stub
	}
	public void electricalCarDetails() {
		super.displayInfo();
		System.out.println("Number of doors:"+numOfDoors);
		System.out.println("batter capacity:"+batteryCapacity);
	}
	
}

public class VehicleManagementSystem {

	public static void main(String[] args) {
		vehicle v1 = new vehicle("Thar","xyz",2024);
		v1.displayInfo();
		car c1=new car("farari","pqr",2022,4);
		c1.displayInfo();
		electricalCar e1 = new electricalCar("mercury","hdh",2021,4);
		e1.displayInfo();
	}

}

}