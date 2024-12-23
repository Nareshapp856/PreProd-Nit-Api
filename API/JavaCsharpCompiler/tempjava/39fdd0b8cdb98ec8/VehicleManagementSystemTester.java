class vahicle{
    String brand;
    String model;
    int year;
    public vahicle(String brand,String model,int year)
    {
        this.brand=brand;
        this.model=model;
        this.year=year;
    }
  public void displayInfo(){
    System.out.println("Brand :"+brand);
    System.out.println("Model :"+model);
    System.out.println("year :"+year);
 }
}
class vahicle extends car
{
  int numDoors;
  public car(String brand,String model,int year,int numDoors)
  {
    super(brand,model,year);
    this.numDoors=numDoors;
  }
  public void carDetails(){
    System.out.println("Number of Doors"+numDoors);
  }
}
class car extends electricCar
{
    int batteryCapacity;
    public electricCar(String brand,String model,int year,int numDoors,int batteryCapacity){
        super(brand,model,year,numDoors);
        this.batteryCapacity=batteryCapacity;
    }
    public void  electricCarDetails(){
        System.out.println("batteryCapacity"+batteryCapacity)
    }
}

public class VehicleManagementSystemTester{
    public static void main (String[]args){
        car c=new car("honda","C3",2007,4);
    }
}