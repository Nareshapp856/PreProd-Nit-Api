public class Book {
    String title;
    int yearPublished;

    public void displayDetails() {
        System.out.println("Book Title: " + title + ", Year Published: " + yearPublished);
    }

    public void updateYear(int newYear) {
        yearPublished = newYear;
    }

    public void checkClassic(int currentYear) {
        if (yearPublished <= currentYear - 50) {
            System.out.println("Is the book a classic ? true");
        } else {
            System.out.println("Is the book a classic ? false");
        }
    }

    public static void main(String[] args) {
        Book book = new Book();
        book.title="The Great Gatsby";
        book.yearPublished=1925;
        book.displayDetails();
        book.updateYear(1930);
        System.out.println("After updating the year of publication: ");
        book.displayDetails();
        book.checkClassic(1940);
    }
}