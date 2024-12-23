public class Book{
    String bookTitle="The Great Gastby";
    int yearPublished=1925;
    public void displayDetails(){
        System.out.print("Book Title: "+bookTitle) ;
         System.out.println(" Year Published: "+yearPublished);
    }
    public void updateYear(int newYear){
       System.out.println("After updating the year of publication:");
        System.out.print("Book Title: "+bookTitle);
        System.out.println("Year Published: "+newYear);
    }
    public void checkClassic(int currentYear){
        if(yearPublished<=1950){
            System.out.println("It the book a classic ? true"+currentYear);
        }else{
            System.out.println("false");
        }
    }
    public static void main(String[]argas){
        Book b=new Book();
		b.displayDetails();
		b.updateYear(1930);
		b.checkClassic(1950);
		
    }
}