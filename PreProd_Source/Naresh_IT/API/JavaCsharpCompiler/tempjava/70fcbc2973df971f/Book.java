public class Book{
    String title=The Great Gatby;
    int yearPublished=1925;
    public void displayDetails(){
         System.out.print("-Book Tittle,"+title);
      System.out.println("Year Published:"+yearPublished);   
    }
   public void updateYear(int currentYear){
    System.out.println("Year Published:"+currentYear);   
   } 
   public static void main(String[] args){
    Book b1.new Book();
    b1.displayDetails();
    b1.updateYear(1930);

   }
}