public class Book{

    public void displayDetails(){
         String title="The Great Gatby";
    int yearPublished=1925;
         System.out.print("-Book Tittle:"+title);
      System.out.println(",Year Published:"+yearPublished);   
    }
   public void updateYear(int currentYear){
    String title="The Great Gatby";
     System.out.println("After updating the year of publication:"); 
     System.out.print("-Book Tittle:"+title);
   
    System.out.println("is the book a classic ? true"); 
      
   } 
   public static void main(String[] args){
    Book b1=new Book();
    b1.displayDetails();
    b1.updateYear(1930);

   }
}