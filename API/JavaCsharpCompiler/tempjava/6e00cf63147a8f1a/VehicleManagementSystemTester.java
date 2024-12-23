import java.util.scanner;
public class VehicleManagementSystemTester{
        String brand;
		String model;
		int year;
		public VehicleManagementSystem(String brand,String model,int year) {
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
public class VehicleManagementSysteminf {

	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in);
		 electricCar e= new electricCar("ruchi","MT-07",2024,"Sports,100");
		e.electricCarDisplayDetails();
		Car c= new Car("Audi","Q8",2026,4);
		c.carDisplayDteails();
		
	}

}


	
			
		
		



