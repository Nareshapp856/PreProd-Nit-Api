class Vehicle{
    String brand;
    String model;
    int year;

    Vehicle(String brand,String model, int year){
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    public void displayInfo(){
        System.out.println("Brand:- "+brand+"\nModel:- "+model+"Year:- "+year);
    }

}

class Car extends Vehicle{
    int numDoors;
    Car(String brand,String model, int year, int numDoors){
        super(brand,model,year);
        this.numDoors = numDoors;

    }
    public void carDetails(){
        displayInfo();
        System.out.println("number of doors:- "+numDoors);
    }
}

class ElectricCar extends Car{
    int batteryCapacity;
    ElectricCar(String brand,String model, int year, int numDoors,int batteryCapacity){
        super(brand,model,year,numDoors);
        this.batteryCapacity=batteryCapacity;
    }
    public void electricCarDetails(){
        carDetails();
        System.out.println("battery capacity:-"+batteryCapacity);

    }
}

public class VehicleManagementSystemTester{
    public static void main(String []args){
        ElectricCar c = new ElectricCar("Tata","Nano",2024,5,10000);
        c.electricCarDetails;
    }
}