class EBookSystemTester
{
String title;
String author;
double price;
   
   public book(String title,String author,double price){
    this.title=title;
    this.author=author;
    this.price=price;
   }
   public void display(){
    system.out.print("Title book:+title");
    system.out.print("Author:+author");
   }
}
class ebook extends EBookSystemTester
{
double filesize;
String format;

public book(double filesize,String format ){
    this.filesize=filesize;
    this.format=format;
}
public void getdetails(){
    system.out.print("title book:+title");
    system.out.print("The file size:+filesize");
    system.out.print("format:+format")
}
}
class audiobook extends EBookSystemTester
{
double duration;
String narrator;

public book(double duration,String narrator){
    this.duration=duration;
    this.narrator=narrator;
}
public void getdetails(){
    system.out.print("Duration:+duration");
    system.out.print("Narrator:+narrator")
}
}