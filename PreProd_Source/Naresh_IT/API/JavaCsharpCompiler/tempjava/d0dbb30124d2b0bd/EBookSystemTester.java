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
        System.out.println("Additional details : "+this.fileSize+" "+this.format);
    }

}

class AudioBook  extends Book{
    public double duration;
    public AudioBook(String title,String author,double price,double duration){
        super(title,author,price);
        this.duration = duration;
    }
    public void getDetails(){
        super.getDetails();
        System.out.println("duration : "+this.duration);
    }
}

public class EBookSystemTester{
    public static void main(String Args[]){
           EBook Book1 = new EBook("Three hundred of tiches","Sudha Murthy",500,45.0,"pdf format");
           AudioBook Book2 = new AudioBook("Heal","Junior",450,4.5);
           Book1.getDetails();
           Book2.getDetails();
    }

}