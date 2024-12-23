class Book
{
    String title of the book;
    String author of the book;
    double price of the book;
    {
        super(title,author,price);
        this.title=+title;
        this.author=+author;
        this.price=+price;
    }
    public class book(String,String,double)
    {
        System.out.println("book title"+title);
        System.out.println("book author"+author);
        System.out.println("book price"+price);
    }
    void getDetails(title,author,price);
}
class Book extends Ebook
{
    double file size of ebook;
    String format of ebook;
    {
        super(file size,format);
        this.size=+size;
        this.format=+format;
    }
    public class Ebook(double,String)
    {
        System.out.println("size=+size");
        System.out.println("format=+format");
    }
    void getDetails(file size,format);
}
class Ebook extends AudioBook
{
    double duration of hours;
    String name of narrator;
    {
        super(hours,narrator);
        this.hours=+hours;
        this.narrator=+narrator;
    }
    public class AudioBook(double,String)
    {
        System.out.println("hours=+hours");
        System.out.println("narrator=+narrator");
    } 
    void getDetails(duration,narrator);
}
class EBookSystemTester
{
Book title=method;
Ebook=new ebook file size=MB;
Ebook=new ebook format=PDF;
AudioBook duration=1 hours;
AudioBook narrator=fdd;

}