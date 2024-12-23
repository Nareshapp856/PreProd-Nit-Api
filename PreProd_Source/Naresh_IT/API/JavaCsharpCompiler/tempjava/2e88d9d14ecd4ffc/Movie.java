public class Movie{
    String title ;
    int releaseYear ;
    public void displayDetails(){
        System.out.println("Movie Title : " + this.title + ", Release Year : " + releaseYear);
    }
    public void updateReleaseYear(int year){
        this.releaseYear = year ;
    }
    public void checkAwardWinner(int currentYear){
        System.out.println("Is the movie an award winner?" + (currentYear-this.releaseYear >= 20)) ;
    }
    public static void main(String[] args){
        Movie m1 = new Movie();
        m1.title = "The Godfather";
        m1.releaseYear = 1972 ;
        m1.displayDetails();
        System.out.println("After updating the release year:");
        m1.updateReleaseYear(1975);
        m1.displayDetails();
        m1.checkAwardWinner(2024);
    }
}