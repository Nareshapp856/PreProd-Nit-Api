public class Vehicle3 {
	
    String brand;
    String model;
    int year;

    public Vehicle3(String brand,String model,int year) {
    super();
    this.brand=brand;
    this.model=model;
    this.year=year;
}
    
    public void displayInfo(){
       System.out.println("Brand is:"+brand);
       System.out.println("Model is:"+model);
       System.out.println("Year is:"+year); 
    }
}

class Car4 extends Vehicle3{
    int numDoors;

    Car4(String brand,String model,int year, int numDoors){
    super(brand,model,year);
    this.numDoors=numDoors;
    }

   public void carDetails(){
    super.displayInfo();
    System.out.println("Number of Doors:"+numDoors);
   } 
}
class ElectricCar extends Car{
    int batteryCapacity;

 ElectricCar(String brand,String model,int year, int numDoors,  int batteryCapacity){
 super(brand,model,year,numDoors);
 this. batteryCapacity= batteryCapacity;
 }

 public void electricCarDetails(){
    super.displayDetails();
    System.out.println("Battery Capacity:"+batteryCapacity);
 }
}

public class VehicleManagementSystemTester {

	public static void main(String[] args) {
		
		
		ElectricCar e= new ElectricCar("Toyoto","Nexon",1980,4,12);
		System.out.println("Electric Car details");
        e.electricCarDetails();
	}

}

 

