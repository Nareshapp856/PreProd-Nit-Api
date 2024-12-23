
class Vehicle 
{  
    String brand;  
    String model;  
    int year;  

    
    public Vehicle(String brand, String model, int year)
     {  
        this.brand = brand;  
        this.model = model;  
        this.year = year;  
    }  

     
    void displayInfo() 
    {  
        System.out.println("Vehicle Brand: " + brand);  
        System.out.println("Vehicle Model: " + model);  
        System.out.println("Manufacture Year: " + year);  
    }  
}  


class Car extends Vehicle 
{  
    int numDoors;  
  
    public Car(String brand, String model, int year, int numDoors) 
    {  
        super(brand, model, year);  
        this.numDoors = numDoors;  
    }  

    
    void carDetails() 
    {  
        displayInfo();  
        System.out.println("Number of Doors: " + numDoors);  
    }  
}  

 
class ElectricCar extends Car 
{  
    int batteryCapacity;  

    
    public ElectricCar(String brand, String model, int year, int numDoors, int batteryCapacity) 
    {  
        super(brand, model, year, numDoors);  
        this.batteryCapacity = batteryCapacity;  
    }  

    
    void electricCarDetails() 
    {  
        carDetails(); 
        System.out.println("Battery Capacity: " + batteryCapacity + " kWh");  
    }  
}  
public class VehicleManagementSystemTester 
{  
    public static void main(String[] args) 
    {  
         
        ElectricCar myElectricCar = new ElectricCar("Tesla", "Model 3", 2022, 4, 75);  

        
        myElectricCar.electricCarDetails();  
    }  
}