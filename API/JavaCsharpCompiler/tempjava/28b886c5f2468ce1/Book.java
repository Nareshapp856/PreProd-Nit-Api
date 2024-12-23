public class Book
{
    String title;
    int yearPublished;
}
public void  displayDetails()
{
    System.out.println("Book Title"+title);
    System.out.println("Book Published year"+yearPublished);
    System.out.println("update Book Published year"+newYear);
}
public void updateYear()
{
    int newYear=2030;
}
public static void main (String [] args)
{
   Book b1=new Book();
   b1.title="The Great Gatsby";
   b1.yearPublished=1925;
   b1. displayDetails();
  
}