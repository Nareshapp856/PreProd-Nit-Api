class Book{
    String title;
    String author;
    double price;
    Book(String title,String author,double price){
        this.title=title;
        this.author=author;
        this.price=price;
    }
    void String getDisplay(){
        return("Book title :"+title+", "+"author :"+author+", "+"price :"+price);
    }
    void applyDiscount(double percentage){
        int money=(percentage/100)*price;
        String display=getDisplay();
        price=price-money;
        System.out.println(display+" "+After Applying discount price :"+price);

    }
}

class EBook extends Book{
   double filSize;
   String format;
   Ebook(String title,String author,double price,double filSize,String format){
    super(title,author,price);
    this.filSize=filSize;
    this.format=format;
   }
   void getDisplay(){
    System.out.println(super.getDisplay()+", "+"filSize :"+filSize+", "+"format :"+format);
   }
   
}

class AudioBook extends Book{
    double duration;
    String narrator;
    AudioBook(String title,string author,double price,double duration,String narrator){
        super(title,author,price);
        this.duration=duration;
        this.narrator=narrator;
    }
      void getDisplay(){
    System.out.println(super.getDisplay()+", "+"duration :"+duration+", "+"narrator :"+narrator);
   }
}
public class  EBookSystemTester{
    public static void main(String[] args){
        Book b1=new Book("wings of fire","Ramoji rao",200);
        b1.getDisplay();
        b1.applyDiscount(10);
        
    }
}