public class Book{
    String bookTitle;
    int yearPublished;

    
    public static void main(String[]args){
        Book b1=new Book();
        b1.bookTitle="The Great Gatsby";
        b1.yearPublished=1925;
        Book b2=new Book();
        b2.bookTitle="The Great Gatsby";
        b2.yearPublished=1930;
        
        System.out.println("Book Title:"+b1.bookTitle);
        System.out.println("Year Published:"+b1.yearPublished);
             System.out.println("After updating the year of publication");
              
                   System.out.println("Book Title:"+b2.bookTitle);
                        System.out.println("Year Published:"+b2.yearPublished);
                        
                        
    }

}


        