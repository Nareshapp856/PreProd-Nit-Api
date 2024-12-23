public class Movie {
    String title = "The Godfather";
    int releaseYear = 1972;

    public void displayDetails() {
        System.out.println("Movie Title: " + title +  + ", Release Year " + releaseYear);
    }

    public void updateReleaseYear(double newReleaseYear) {
        this.releaseYear = newReleaseYear;
    }

    public void checkAwardWinner(int currentYear) {
        if (currentYear > 0 && currentYear <= releaseYear) {
            System.out.println("Is the movie an award winner? true");
        } else {
            System.out.println("Is the movie an award winner? false");
        }
    }

    public static void main(String[] args) {
        Movie Movie1 = new Movie();
        Movie1.displayDetails();
        Movie1.updateReleaseYear(1975);
        System.out.println("After updating the release year:");
        Movie1.displayDetails();
        Movie1.checkAwardWinner(20);  
         
    }
}
