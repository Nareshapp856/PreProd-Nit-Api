public class Book {
    private String title;
    private int yearPublished;

    public Book(String title, int yearPublished) {
        this.title = title;
        this.yearPublished = yearPublished;
    }

    public void displayDetails() {
        System.out.println("Book Title: " + title + ", Year Published: " + yearPublished);
    }

    public void updateYear(int newYear) {
        this.yearPublished = newYear;
    }

    public void checkClassic(int currentYear) {
        boolean isClassic = (yearPublished <= currentYear - 50);
        System.out.println("Is the book a classic? " + isClassic);
    }

    public static void main(String[] args) {
        // Create a Book object
        Book book = new Book("The Great Gatsby", 1925);

        // Display the book's details
        book.displayDetails();

        // Update the book's year of publication
        System.out.println("\nAfter updating the year of publication:");
        book.updateYear(1930);
        book.displayDetails();

        // Check if the book is a classic
        book.checkClassic(2024); // Assuming the current year is 2024
    }
}