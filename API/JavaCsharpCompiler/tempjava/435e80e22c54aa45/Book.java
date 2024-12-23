public class Book{
    String title;
    int yearPublished;
    public void displayDetails(){
        System.out.println("Book Title: "+title);
        System.out.println("Year Published: "+yearPublished);
    }
    public void updateYear(int newYear){
        yearPublished=newYear;
        System.out.println("After updating the year of publication:");
        System.out.println("Book Title: "+title);
        System.out.println("Year Published: "+newYear);
    }
    public void checkClassic(int currentYear){
        System.out.println("Is the book a classic ? ");
        if((currentYear-yearPublished)>=50){
            System.out.println("true");
        }else{
            System.out.println("false");
        }
    }
    public static void main(String []args){
        Book b1 = new Book();
        b1.title="The Great Gatsby";
        b1.yearPublished=1925;
        b1.displayDetails();
        b1.updateYear(1930);
        b1.checkClassic(2024);
    }
}