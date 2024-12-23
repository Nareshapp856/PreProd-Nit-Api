class Book
{
    String title;
    String author;
    double price;
    public Book(String title, String author, double price)
    {
        super();
        this.title = title;
        this.author = author;
        this.price = price;
    }
    void getDetails()
    {
        System.out.println("Title :"+title);
        System.out.println("Author :"+author);
        System.out.println("Price :"+price);
    }
    void applyDiscount(double percentage)
    {
        System.out.println("Price with Discount :"+(price*percentage/100));
    }


}

class EBook extends Book
{
    double fileSize;
    String format;

    public EBook(String title, String author, double price, double fileSize, String format)
    {
        super(title, author, price);
        this.fileSize = fileSize;
        this.format = format;
    }
    void getDetails()
    {
        super.getDetails();
        System.out.println("FileSize :"+fileSize );
        System.out.println("Format :"+format );
    }

}

class AudioBook extends Book
{
    double duration;
    String narrator;
    public AudioBook(String title, String author, double price, double duration, String narrator)
    {
         super(title, author, price);
         this.duration = duration;
         this.narrator =narrator;
    }
    void getDetails()
    {
        super.getDetails();
        System.out.println("Duration :"+duration+"hours");
         System.out.println("Narrator :"+narrator);

    }
    
}


public class EBookSystemTester{

public static void main(String [] args)
{
    EBook eBook = new EBook;
    AudioBook audioBook = new AudioBook();

    eBook.getDetails();
    System.out.println("------------------------")
    audioBook.getDetails();

}

}