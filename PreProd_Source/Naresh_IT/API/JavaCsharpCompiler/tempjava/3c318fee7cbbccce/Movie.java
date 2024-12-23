public class Movie{
    String title;
    int releaseYear;
    public void displayMovieDetails(){
        title="The Godfather";
        releaseYear=1972;
        System.out.print("Movie Title: " +title+", Release Year: "+releaseYear);
    }
    public void updateReleaseYear(int newReleaseYear){
      newReleaseYear=1975;  
      }
    public void boolean checkAwardWinner(int currentYear){
        releaseYear=releaseYear-currentYear;
        if(releaseYear<=20){
            return true;
        System.out.println("The Movie is an award Winner.");
        }
        else{
            return false;
            System.out.println("The Movie is not an award Winner.");
        }
    }
        public static void main(String [] args){
         Movie m1=new Movie();
         m1.displayMovieDetails();
         m1.updateReleaseYear(1975);
         m1.checkAwardWinner();
        }
}