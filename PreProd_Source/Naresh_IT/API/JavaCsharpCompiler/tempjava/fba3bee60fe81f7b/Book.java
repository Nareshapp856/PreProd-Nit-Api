public class Book{
    String title;
    int yearPublished;
public  void displayDetails(){
    System.out.println("Title of the book:"+title);
    System.out.println("uer of the book published:"+yearPublished);

}
public static void main(String []args)
{
    Book.b1=new Book();
    b1.title="The Great Gatsby";
    b1.yearPublished=1925;
 displayDetails();   
}

}