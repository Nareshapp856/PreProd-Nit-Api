

class Vehicle{
    String brand;
    String model;
    int year;

    Vehicle(String brand,String model,int year){
    super();
    this.brand=brand;
    this.model=model;
    this.year=year;
}
    
    public void displayInfo(){
       System.out.println("Brand is:"+brand);
       System.out.println("Model is:"+Model);
       System.out.println("Year is:"+Year); 
    }
}

class Car extends Vehicle{
    int numDoors;

    Car(String brand,String model,int year, int numDoors){
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
 super(brand,model,year);
 this. batteryCapacity= batteryCapacity;
 }

 public void electricCarDetails(){
    super.carDetails();
    System.out.println("Battery Capacity:"+batteryCapacity);
 }
}

 public class VehicleManagementSystemTester{
    public static void main(String[] args){

        ElectricCar e= new ElectricCar();
        e.electricCarDetails("Toyoto","Nexon",1980,4,"12KWh");
    }
}