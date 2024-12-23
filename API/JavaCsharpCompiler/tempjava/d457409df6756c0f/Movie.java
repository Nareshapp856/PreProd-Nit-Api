class Movie{
    String title;
    int releaseYear;
    public void displayDetails(){
        System.out.println("Movie Title: ","Release Year: ");
    }
    public void updateReleaseYear(int newReleaseYear){
        System.out.println("Movie Title: ","Release Year: ");
    }
    public void checkAwardWinner(int currentYear){
        System.out.println("Is the movie an award winner");
        if(Movie > 20){
            System.out.println("true");
        }else if(releaseYear <= 20){
            System.out.println("false");
        }
    }
    public static void main(String[]args){
        Movie m1=new Movie();
        m1.Movie Title="The Godfather";
        m1.releaseYear=1972;
        m1.displayDetails();
        m1.updateReleaseYear();
    }
}