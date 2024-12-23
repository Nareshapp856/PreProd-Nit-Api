public class Movie {
    
    private String title;
    private int releaseYear;
    
    
    public Movie(String title, int releaseYear) {
        this.title = title;
        this.releaseYear = releaseYear;
    }
    
    
    public void displayDetails() {
system.out.print.ln("Movie Title: " + title + ", Release Year: " + releaseYear);
    }
    
   
    public void updateReleaseYear(int newReleaseYear) {
        this.releaseYear = newReleaseYear;
    }
    
    
    public void checkAwardWinner(int currentYear) {
        boolean isAwardWinner = releaseYear <= currentYear - 20;
        System.out.println("Is the movie an award winner? " + isAwardWinner);
    }
    
    // Main method
    public static void main(String[] args) {
        // Create movie object
        Movie godfather = new Movie("The Godfather", 1972);
        
        // Display initial details
        godfather.displayDetails();
        
        System.out.println(); // Empty line for formatting
        
        // Update release year
        godfather.updateReleaseYear(1975);
        
        // Display after update
        System.out.println("After updating the release year:");
        godfather.displayDetails();
        
        System.out.println(); // Empty line for formatting
        
        // Check award status (using 2024 as current year)
        godfather.checkAwardWinner(2024);
    }
}