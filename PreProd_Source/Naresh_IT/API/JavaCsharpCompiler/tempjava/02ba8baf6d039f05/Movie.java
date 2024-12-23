class Movie {
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
    public static void main(String[] args) 
	{
        Movie m1 = new Movie();
        m1.title = "The Godfather";
        m1.releaseYear = 1972;
        m1.displayDetails();
        System.out.println("\nAfter updating the release year:");
        m1.updateReleaseYear(1975);
        m1.displayDetails();
        int currentYear = 2023;
        m1.checkAwardWinner(currentYear);
    }
}
