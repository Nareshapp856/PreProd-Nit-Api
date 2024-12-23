class Vehicle
{
    String brand;
    String model;
    int year;
    public Vehicle(String brand,String model,int year)
    {
        this.brand=brand;
        this.model=model;
        this.year=year;
    }
    public void displayInfo()
    {
        System.out.println(brand);
         System.out.println(model);
          System.out.println(year);

    }
}
class Car extends Vehicle
{
    int numDoors;
    public Car(int numDoors)
    { this.numDoors=numDoors;
        super("bmw","2018",2023);
    }
    public void carDetails()
    {    super.DisplayInfo();
         System.out.println(numDoors);
    }
}
  class ElectricCar extends Car
  {
    int batteryCapacity;
    public ElectricCar(int batteryCapacity)
    {  this.batteryCapacity=batteryCapacity;
         super.carDetails();
          System.out.println(batteryCapacity);
    }

  }
  class Main()
  {
    public Static void main(String args[])
    {
        Car s1=new Car(4);
        ElectricCar s2=new Electric Car(5000);
        s1.carDetails();
    }
  }