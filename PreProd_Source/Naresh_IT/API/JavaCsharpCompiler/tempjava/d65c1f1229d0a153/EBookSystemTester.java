class Book{
    String title;
    String author;
    double price;

    Book(String title, String author, double price){

        this.title = title;
        this.author = author;
        this.price = price;
    }

    void getDetails(){
        System.out.println("Book title : " + this.title);
        System.out.println("Book author : " + this.author);
        System.out.println("Book price : " + this.price);
    }

    void applyDiscount(double percentage){

        double totalcost = this.price * (percentage / 100);
        System.out.println("Total cost of book : " + totalcost);
    }
}

class EBook extends Book{

    double fileSize;
    String format;

    EBook(String title, String author, double price, double size, String format){
        super(title, author, price);
        this.fileSize = size;
        this.format = format;
    }

    void getDetails(){
        super.getDetails();
        System.out.println("File size : " + this.fileSize);
        System.out.println("File format : " + this.format);
    }
}

class AudioBook extends Book{

    double duration;
    String narrator;

    AudioBook(String title, String author, double price, double duration, String narrator){

        super(title, author, price);
        this.duration = duration;
        this.narrator = narrator;
    }

    void getDetails(){
        super.getDetails();
        System.out.println("Duration : " + this.duration);
        System.out.println("Narrator : " + this.narrator);
    }
}

public class EBookSystemTester{
    public static void main(String[] args){

        Book b = new Book("Java programming", "James Gosling " ,1500.0);
        b.getDetails();
        b.applyDiscount(50);
    }
}