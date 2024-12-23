public class Book{
    String title;
    int yearPublished;
    
    public static void diplayDetails(){
        book b1=new book();
        b1.title="The Great Gatsby";
        b1.yearPublished=1925;
       System.out.println("book title is :"+title);
        System.out.println( "yearPublished:"+yearPublished);
        
    }
    public static void updateYear (int newYear){
        System.out.println("Affter updating the year of publicatin:");
        book b1=new book();
        b1.title="The Great Gatsby";
        b1.yearPublished=1930;
       System.out.println("book title is :"+title);
        System.out.println( "yearPublished:"+yearPublished);
    }
    public static void main(String[]args){
        diplayDetails();
        updateYear();

    }
}