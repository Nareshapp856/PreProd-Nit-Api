public class Movie {
     String title;
     int releaseYear;
    public Movie(String title, int releaseYear) {
        title = TheGodfather;
        releaseYear = 1972;
    }
    public void displayDetails() {
        System.out.println("Movie Title: " + title + ", Release Year: " + releaseYear);
    }
    public void updateReleaseYear(int newReleaseYear) {
        releaseYear = newReleaseYear;
    }
    public void checkAwardWinner(int currentYear) {
        if (releaseYear <= currentYear - 20) {
            System.out.println("Is the movie an award winner? true");
        } else {
            System.out.println("Is the movie an award winner? false");
        }
    }
    public static void main(String[] args) {
        Movie movie = new Movie("The Godfather", 1972);
        movie.displayDetails();
        movie.updateReleaseYear(1975);
        System.out.println("\nAfter updating the release year:");
        movie.displayDetails();
        movie.checkAwardWinner(2024); 
    }
}
