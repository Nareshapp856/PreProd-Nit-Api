class Book{
    public String title;
    public String author; 
    public double price;
    public Book(String title,String author,double price){
        this.title = title;
        this.author = author;
        this.price = price;
    }
    public void getDetails(){
        System.out.println("Book details : \nTitle :"+this.title+"\nAuthor :"+this.author+"\nPrice :"+this.price);
    }
    public void applyDiscount(double percentage){
          System.out.println((price*percentage)/100);
    }
}
class EBook  extends Book{
    public double fileSize;
    public String format;
    public EBook(String title,String author,double price,double fileSize,String format){
        super(title,author,price);
        this.fileSize = fileSize;
        this.format = format;
    }
    public void getDetails(){
        super.getDetails();
        System.out.println("Additional details : \nFileSize :"+this.fileSize+"\nformat :"+this.format);
    }

}

class AudioBook  extends Book{
    public double duration;
    public String narrator;
    public AudioBook(String title,String author,double price,double duration,String narrator){
        super(title,author,price);
        this.duration = duration;
        this.narrator = narrator;
    }
    public void getDetails(){
        super.getDetails();
        System.out.println("duration : "+this.duration);
        System.out.println("narrator : "+this.narrator);
    }
}

public class EBookSystemTester{
    public static void main(String Args[]){
           EBook Book1 = new EBook("Three hundred of tiches","Sudha Murthy",500,45.0,"pdf format");
           AudioBook Book2 = new AudioBook("Heal","Junior",450,4.5,"Myself");
           System.out.println("FirstBook details :");
           Book1.getDetails();
           System.out.println("SecondBook details :");
           Book2.getDetails();
           System.out.println("applyDiscount method Book1 :");
           Book1.applyDiscount(4.5);
           System.out.println("applyDiscount method Book2 :");
           Book1.applyDiscount(5.5);

           Book b = new Book("Three hundred of tiches","Sudha Murthy",505.0);
           System.out.println("Book getDetails :");
           b.getDetails();
    }

}