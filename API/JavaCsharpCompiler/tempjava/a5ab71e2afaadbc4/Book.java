class The Great Gatsby {
    
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
        
        if (currentYear - yearPublished > 50) {
            System.out.println("Is the book a classic? true");
        } else {
            System.out.println("Is the book a classic? false");
        }
    }

    public static void main(String[] args) {
        
        Book book = new Book("The Great Gatsby", 1925);

        
        book.displayDetails();

        
        book.updateYear(1930);

       
        System.out.println("After updating the year of publication:");
        book.displayDetails();

        
        book.checkClassic(2024);
    }
}
