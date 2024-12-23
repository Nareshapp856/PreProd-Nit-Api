public class Book{

    public void displayDetails(){
         String title="The Great Gatby";
    int yearPublished=1925;
         System.out.print("-Book Tittle:"+title);
      System.out.println(",Year Published:"+yearPublished);
      System.out.println();    

    }
    public void updateYear(int newYear){
     newYear=50;
    }
   public void checkClassic(int currentYear){
     currentYear=currentYear-newYear;
    String title="The Great Gatby";
     System.out.println("After updating the year of publication:"); 
     System.out.print("-Book Tittle:"+title);
    System.out.println("Year Published:"+currentYear);
     System.out.println();  
     System.out.println("is the book a classic ? true"); 
      
   } 
   public static void main(String[] args){
    Book b1=new Book();
    b1.displayDetails();
    b1.checkClassic(1930);

   }
}