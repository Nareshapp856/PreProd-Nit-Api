
class Book {
   String title;
   String author;
   double price;
   public Book(String title , String author,double price){
    this.title = title;
    this.author = author;
    this.price = price;
   }
   void getDetails(){
    
     System.out.println("Name : "+title);
      System.out.println("Author : "+author);
       System.out.println("Price : "+price);
   }
   void applyDiscount(double percentage)
   {
            System.out.println("Your Bill : "+(price-(price*(percentage/100))));
   }
   }
class Ebook extends Book
{
    double filesize;
    String format;
    public Ebook(String title,String author,double price,double filesize,String format)
    {
        super(title,author,price);
        this.filesize= filesize;
        this.format=format;
    }
    void getDetails(){
        super.getDetails();
        
        System.out.println(filesize);
         System.out.println(format);
    }
}

class AudioBook extends Book{
    double duration;
    String narrator;
     public AudioBook(String title,String author,double price,double duration,String narrator)
    {
        super(title,author,price);
        this.duration = duration;
        this.narrator = narrator;
    }
    void getDetails(){
        super.getDetails();
        System.out.println(duration);
        System.out.println(narrator);

    }

}
public class EBookSystemTester
{
   public static void main (String [] args)
   {
        Ebook e1 = new Ebook("java","james",200,16,"PDF");
        e1.getDetails();
        e1.applyDiscount(5);
        AudioBook a1 = new AudioBook("Java ","james",200,2.15,"tanmay");
        a1.getDetails();
        a1.applyDiscount(12);
   }
}