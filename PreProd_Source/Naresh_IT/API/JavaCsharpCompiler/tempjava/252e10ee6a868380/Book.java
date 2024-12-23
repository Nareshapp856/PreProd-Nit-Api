public class Book{
    String title;
    int yearPublished;
    
    public static void diplayDetails(){
        Book b1=new Book();
        b1.title="The Great Gatsby";
        b1.yearPublished=1925;
       System.out.println("Book title is :"+b1.title);
        System.out.println( "yearPublished:"+b1.yearPublished);
        
    }
    public static void updateYear (){
        System.out.println("Affter updating the year of publicatin:");
        Book b2=new Book();
        b2.title="The Great Gatsby";
        b2.yearPublished=1930;
       System.out.println("Book title is :"+b2.title);
        System.out.println( "yearPublished:"+b2.yearPublished);
    }
    public static void main(String[]args){
        diplayDetails();
        updateYear();

    }
}