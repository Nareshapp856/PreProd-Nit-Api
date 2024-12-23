
class Book
{
    String title;
    String author;
    double price;

    public Book(String title,String author,double price)
    {
       this.title=title;
       this.author=author;
       this.price=price;
    }

    public void getDetails()
    {
        System.out.println("Book name = "+title);
        System.out.println("Author name = "+author);
        System.out.println("Book price = "+price);

    }
    public void applyDiscount(double percentage)
    {
       
		price=price-percentage;
        System.out.println("Price after discoutn = "+price);

    }
    
}
class EBook extends Book
{
   double filesize;
   String format;

   public EBook(String title,String author,double price,double filesize,String format)
   {
    super(title,author,price);
    this.filesize=filesize;
    this.format=format;
   }
   public void getDetails()
   {
     super.getDetails();
     System.out.println("File Size is Mb = "+filesize);
      System.out.println("File format is = "+format);

   }
}
class AudioBook extends Book
{
    double duration;
    String narrator;
    
    public AudioBook(String title,String author,double price,double duration,String narrator)
    {
       super(title,author,price);
       this.duration=duration;
       this.narrator=narrator;
    }
    public void getDetails()
    {
        super.getDetails();
        System.out.println("Duration in minutes = "+duration);
        System.out.println("Narrator  is = "+narrator);

    }
}

public class EBookSystemTester
{
    public static void main(String args[])
    {
        EBook E1 = new EBook("Think and grow rich","James",100.20,35,"Pdf");
        E1.getDetails(); 
		E1.applyDiscount(20);
		
		System.out.println("-------------------------------------");
		
		AudioBook A1 = new AudioBook("Man ki bat","Modi",50.00,30.00,"DD National");
		A1.getDetails();
		
    }
}