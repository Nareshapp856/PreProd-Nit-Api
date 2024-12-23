import java.util.scanner;
public class VehicleManagementSystemTester{
        String brand;
		String model;
		int year;
		public Vehicle(String brand,String model,int year) {
			this.brand  =  brand;
			this.model =  model;
			this.year  =  year;
			}
		
		public void displayDetails() {
			
			System.out.println("Enter the vehicle brand:"+brand);
			System.out.println("Enter the vehicle model:"+model);
			System.out.println("Enter the vehicle year:"+year);
			}
}
public class  Car extends Vehicle{
	int numberOfDoors;
	public Car(String brand, String model, int year,int numberOfDoors) {
		super(brand, model, year);
		this.numberOfDoors = numberOfDoors;
	}
	public void carDisplayDteails() {
		displayDetails();
		System.out.println("Enter numberOfDoors:"+numberOfDoors);
		}
}
public class electricCar extends Vehicle{
    
	int batteryCapacity;
	public electricCar(String brand, String model, int year,int batteryCapacity) {
		super(brand, model, year);
		this.batteryCapacity = batteryCapacity;
		}
	public void electricCarDisplayDetails() {
		displayDetails();
		System.out.println("Enter bateryCapacity:"+bateryCpacity);
		}


}

	
			
		
		



