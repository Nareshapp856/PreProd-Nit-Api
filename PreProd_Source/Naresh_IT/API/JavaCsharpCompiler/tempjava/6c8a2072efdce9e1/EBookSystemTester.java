class Book{
    String title;
    String author;
    double price;

    public Book(String title, String author,double price){
        this.title=title;
        this.author=author;
        this.price=price;
    }
    public void getDetails(){
        System.out.println("Title:"+title);
         System.out.println("Author:"+author);
          System.out.println("Price:"+price);
    }
    public void applyDiscount(double percentage){
        if(percentage>50){
            price-=100;
    }else{
        price;
    }
    System.out.println("Price after Discount:"+price);
}
}
class EBook extends Book{
    double fileSize;
    String format;

   public EBook(String title, String author,double price,double fileSize,String format){
    super(title,author,price);
    this.fileSize=fileSize;
    this.format=format;
   }
   public void displayInfo(){
    super.displayInfo();
    System.out.println("File Size:"+fileSize);
    System.out.println("Format:"+format);
   }
}
class AudioBook extends Book{
    double duration;
    String narrator;

    public AudioBook(String title, String author,double price,double duration,String narrator){
        super(title,author,price);
        this.duration=duration;
        this.narrator=narrator;
    }
    public void displayInfo(){
        super.displayInfo();
        System.out.println("Duration:"duration);
        System.out.println("Narrator:"+narrator);
    }
}
public class EBookSystemTester{
    public static void main(String[] args){
        Book bk=new Book("Novel","VS khandekar",350);
        bk.displayInfo();
        bk.applyDiscount(60);

        EBook ebk=new EBook("Novel","VS khandekar",350,15.2,"PDF");
        ebk.getDetails();

        AudioBook abk=new AudioBook("Novel","VS khandekar",350,55,"BS Kul");
        abk.getDetails();
    }
}