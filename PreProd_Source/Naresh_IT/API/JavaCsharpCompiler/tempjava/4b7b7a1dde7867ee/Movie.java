public class Movie{
     String title;
     int release year:
    public void ("String title, int release year"){
        public void displayDetails(){
        System.out.println("Movie title: "+title+ReleaseYear: "+releaseYear"); 
        }
        public void updateReleaseYear(int newReleaseYear) 
        {
        releaseYear = newReleaseYear;
        public void checkAwardWinner("isAwardWinner")
         int isAwardWinner = (releaseYear <= currentYear - 20);
         System.out.println;("Is the movie and award winner?"+ isAwardWinner);
    }
    public static void main(String[]args)
    {
    Movie movie = new Movie("The Godfather", 1972);
     movie.displayDetails();
     System.out.println("The Godfather: "+" ReleaseYear:1972");

    Movie updateReleaseYear = new Movie("The Godfather", 1975);
    movie.displayDetails();
     System.out.println("After updating the release year:");
        movie.updateReleaseYear(1975);
        movie.displayDetails();
        movie.checkAwardWinner(2024);
    }
}
    }