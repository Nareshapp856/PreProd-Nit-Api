class Book{
  String title;
  String author;
  double price;
public Book(String title,String author,double price){
    this.title=title;
    this.author=author;
    this.price=price;
} 
public void getDetails(){
    System.out.println("title of the book:"+title);
    System.out.println("author of the book:" 
                                          +author);
    System.out.println("price of the book:"+price);
} 
public void applyDiscount(double percentage){

}
}
class Ebook extends Book{
    double fileSize;
    String format;
public Ebook(String title,String author,double price,double fileSize,String format){
    super(title,author,price);
    this.fileSize=fileSize;
    this.format=format;
}
public void getDetails(){
  System.out.println("file size of the book:"+fileSize);
    System.out.println("format of the book:" 
                                        +format);  
}
}
class AudioBook extends Book{
    double duration;
    String narrator;
public AudioBook(String title,String author,double price,double duration,String narrator){
    super(title,author,price);
    this.duration=duration;
    this.narrator=narrator;
}
public void getDetails(){
  System.out.println("duration of the book:"+duration); 
  System.out.println("narrator of the book:"+narrator); 
}
}
public class EBookSystemTester{
public static void main(String[] args){
Ebook e=new Ebook();
AudioBook a=new AudioBook();
e.getDetails();
a.getDetails();
}
}