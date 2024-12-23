public class Book
{
    String title;
    int year;

    public void displayDetails()
    {
        System.out.print("Book Title:"+title+",");
        System.out.print("Book year"+ year);
    }

    public void  updateYear(int newyear)
    {
        year=newyear;

    }
    public void  checkClassic(int currentyear)
    {
        if(currentyear>50)
        {
            System.out.println("true");

        }
        else
        {
            System.out.println("false");
        }
    }





    public static void main(String[]args)
    {
        Book ob= new Book();
        ob.title="JAVA";
        ob.year=40;
        ob.displayDetails();
        ob.updateYear(60);
        ob.checkClassic(ob.year);

        



    }
}