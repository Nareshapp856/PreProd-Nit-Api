class Book
{
    String title;
    String author;
    double price;
    Book(String title,String author,double price)
    super()
    this.title=title;
    this.author=author;
    this.price=price;
}
public void getDetails()
{
    System.out.prinln("title is:"+title);
    System.out.prinln("author is:"+title);
    System.out.prinln("price is:"+title);
}
public void applyDiscount(double percentage)
{
    Discount=price/10;
}
class EBook extends Book
{
    double fileSize;
    String format;
    
    Ebook(String title,String author,double price, double fileSize,String format)
    super(title,author,price)
    this.fileSize=fileSize;
    this.format=format;
}
void getDetails()
{
    super.getDetails();
    System.out.println("fileSize is:"+fileSize);
    System.out.println("format is:"+format);
}
class AudioBook extends Book
{
    double duration;
    String narrator;
    AudioBook(String title,String author,double price,double duration,string narrator)
}
public void getDisplay()
{
    super.getDetails();
    System.out.println("duration is:"+duration);
    System.out.println("narrator is:"+narrator);
}
public class EBookSystemTester
{
    public static void main(String[]args)
    {
  AudioBook A= new AudioBook("java","games",2000,2,"ravisir");
  A.getDisplay();

  EBook E = new EBook("java","games",2000,2,"pdf")
  E.getDetails();
    }

}