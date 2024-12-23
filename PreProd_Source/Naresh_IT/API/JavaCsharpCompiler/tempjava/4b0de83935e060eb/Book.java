public class Car
{
    String title;
    int year;

    public void displayDetails()
    {
        System.out.print("Car Make:"+title);
        System.out.println("Year:"+ year);
        System.out.println("");
    }

    public void  updateYear(int newyear)
    {
        year=newyear;

    }
    public void  checkClassic(int currentyear)
    {
        if(currentyear>50)
        {
            System.out.println("Is the car Vintage ? true");

        }
        else
        {
            System.out.println("false");
        }
    }





    public static void main(String[]args)
    {
        Car ob= new Car();
        ob.title="Toyota";
        ob.year=1925;
        ob.displayDetails();
        ob.updateYear(1930);
        System.out.println("After updating the year of publication:");
        ob.displayDetails();
        ob.checkClassic(ob.year);


        



    }
}