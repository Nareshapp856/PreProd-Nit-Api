public class Movie {
     String title;
     int releaseYear;
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
        Movie movie = new Movie();
        movie.title="TheGodfather";
        movie.releaseYear=1972;
        movie.updateReleaseYear=
        movie.displayDetails();
        movie.checkAwardWinner(2024);
      
    }
}
