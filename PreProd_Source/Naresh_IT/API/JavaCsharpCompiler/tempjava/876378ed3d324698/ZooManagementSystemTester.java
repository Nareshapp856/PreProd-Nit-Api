verical retal using private
class Vehicle 
{
	private String vehicleType;
	private String licensePlate;
	private double rentalPrice;
	
	public Vehicle(String vehicleType, String licensePlate, double rentalPrice)
	{
		this.vehicleType = vehicleType;
		this.licensePlate = licensePlate;
		this.rentalPrice = rentalPrice;
	}
	
	public String getVehicleType()
	{
		return vehicleType;
	}
	
	public String getLicensePlate()
	{
		return licensePlate;
	}
	
	public double getRentalPrice()
	{
		if(rentalPrice > 0) {
			return rentalPrice;
		}else {
			return -1;
		}
	}

	@Override
	public String toString() {
		if(getRentalPrice() == -1)
		{
			return "Invalid Input Rental Price";
		}else {
			return "Vehicle [Type : " + getVehicleType() + ", License Plate : " + getLicensePlate()
				+ ", Rental Price : $" + getRentalPrice() + "]";
		}
	}	
}

class Car extends Vehicle 
{
	private String fuelType;
	
	public Car(String vehicleType, String licensePlate, double rentalPrice, String fuelType)
	{
		super(vehicleType,licensePlate,rentalPrice);
		this.fuelType = fuelType;
	}
	
	public String getFuelType()
	{
		return fuelType;
	}

	@Override
	
	public String toString() {
		if(getRentalPrice() == -1)
		{
			return "Invalid Input Rental Price";
		}else {
			return "Car [Type : " + getVehicleType() + ", License Plate : " + getLicensePlate() + ", Rental Price : $" + getRentalPrice() + 
				", Fuel Type : " + getFuelType() + "]";
		}
	}
}

class Bike extends Vehicle 
{
	private boolean hasGear;
	
	public Bike(String vehicleType, String licensePlate, double rentalPrice, boolean hasGear)
	{
		super(vehicleType,licensePlate,rentalPrice);
		this.hasGear = hasGear;
	}
	
	public boolean getHasGear()
	{
		return hasGear;
	}
	
	@Override
	public String toString() {
		if(getRentalPrice() == -1)
		{
			return "Invalid Input Rental Price";
		}else {
			return "Bike [Type : " + getVehicleType() + ", License Plate : " + getLicensePlate() + ", Rental Price : $" + getRentalPrice() + 
				", Has Gear : " + getHasGear() + "]";
		}
	}
}


public class car
{
	public static void main(String[] args) 
	{
		Car car = new Car("Car", "ABC123", 200.0, "Petrol");   
		
		System.out.println(car);
		System.out.println();
	
	}

}