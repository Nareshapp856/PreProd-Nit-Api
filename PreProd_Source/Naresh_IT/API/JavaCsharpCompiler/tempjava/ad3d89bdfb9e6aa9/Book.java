public class Book
{
    String title;
    int yearPublished;

public void  displayDetails()
{
    System.out.println("Book Title"+title);
    System.out.println("Book Published year"+yearPublished);
    
}
public void updateYear(int newYear)
{
    System.out.println("update Book Published year"+newYear);
}
public void checkClassic(int newYear)
{
    if(newYear>=50)
    {
        System.out.println("true");

    }else
    {
        System.out.println("false");
    }
}
public static void main (String [] args)
{
   Book b1=new Book();
   b1.title="The Great Gatsby";
   b1.yearPublished=1925;
   b1. displayDetails();
   b1.updateYear(2030);
   b1.checkClassic(2030);
}
}