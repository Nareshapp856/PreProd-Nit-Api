
class Book
{
    String title;
    String author;
    double price;
    Book(String title,String author,double price)
    {
        this.title=title;
        this.author=author;
        this.price=price;
    }
    public void details()
    {
        System.out.println("name is"+title);
        System.out.println("author is"+author);
        System.out.println("price is"+price);
    }
}
class Ebook extends Book
{
    double size;
    String format;
    Ebook(String title,String author,double price,double size,String format)
    {
        super(title,author,price);
        this.size=size;
        this.format=format;
    }
    public void details()
    {
        super.details();
        System.out.println("size is"+size);
        System.out.println("format is"+format);
    }

}
class Audio extends Book
{
    double duration;
    String narrator;
    Audio(String title,String author,double price,double duration,String narrator)
    {
        super(title,author,price);
        this.duration=duration;
        this.narrator=narrator;
    }
    public void details()
    {
        super.details();
        System.out.println("duration is"+duration);
        System.out.println("narator is"+narrator);
    }

}

public class EBookSystemTester
{
    public static void main(String[] args)
    {
        Book obj = new Book("abc","ganesh",150.0);
        Ebook obje = new Ebook("xyz","ramesh",200.0,156.7,"pdf");
        Audio object = new Audio("fgh","suresh",300.0,25.6,"somesh");
        obj.details();
        obje.details();
        object.details();

    }
}