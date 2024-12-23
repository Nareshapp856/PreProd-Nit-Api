public class Book{
    String title;
    int yearPublished;
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
        b1.title = "The Great Gatsby";
        b1.yearPublished = 1925;
        b1.newYear = 1930;
        b1.currentYear = 2024;
        displayDetails(yearPublished);
        updateYear(newYear);
        System.out.println("Is the book a classic ?");
        checkClassic(currentYear);
    }
}