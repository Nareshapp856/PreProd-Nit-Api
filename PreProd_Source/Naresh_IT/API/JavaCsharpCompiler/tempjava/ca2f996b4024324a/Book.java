public class Book{
    String title="The Great Gatsby";
    int yearPublished = 1925;
    public void displayDetails(){
        System.out.println("Book Title: "+title);
        System.out.println("Year Published: "+yearPublished);
    }
    public void updateYear(int newYear){
        System.out.println("After updating the year of publication:");
        yearPublished = newYear;
        displayDetails();
    }
    public void checkClassic(int currentYear){
        int year;
        year = currentYear - yearPublished;
        if(year >= 50){
            System.out.print("True");
        }
        else{
            System.out.print("False");
        }
    }
    public static void main(String []args){
        Book b1 = new Book();
        b1.displayDetails();
        // b1.yearPublished = 1925;
        // b1.newYear = 1930;
        // b1.currentYear = 2024;
        b1.updateYear(1930);
        System.out.println("Is the book a classic ?");
        b1.checkClassic(2024);
    }
}