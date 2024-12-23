public class Book
{
    String title;
    int yearPublished;
    public void displayDetails()
    {
        System.out.println("Title :"+title);
        System.out.println("Year of Published :"+yearPublished);
    }
    public void updateYear(int newYear)
    {
        yearPublished+=newYear;
        displayDetails();
    }
    public void checkClassic(int currentYear)
    {
        if(yearPublished<=50)
        {
            System.out.println("true");
        }
        else
        {
            System.out.println("false");
        }
    }
    public static void main(String args[])
    {
        Book b=new Book();
        b.title="The Great Gatsby";
        b.yearPublished=1925;
        b.displayDetails();
        System.out.print("After updating the year of publication:");
        b.updateYear(5);
        System.out.println("Is the book a classic?");
        b.checkClassic(b.yearPublished);
    }
}