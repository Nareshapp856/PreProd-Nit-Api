public class Movie{
    String title;
    int releaseYear;
    int newReleaseYear;

    public void displayMovieDetails(){
        title="The Godfather";
        releaseYear=1972;
        System.out.print("Movie Title: " +title+" , Release Year: "+releaseYear);
    }

    public void updateReleaseYear(int newReleaseYear){
        System.out.print("\n\nAfter updating the release year:");  
        title="The Godfather";
        newReleaseYear=1975;
        System.out.print("\nMovie Title: " +title+", Release Year: "+newReleaseYear);
    }

    public boolean checkAwardWinner(int currentYear){
        releaseYear=releaseYear-currentYear;
        if(releaseYear<=20){
                return true;
        }
        else{
            return false;
        }
    }
    
        public static void main(String [] args){
         Movie m1=new Movie();
         m1.displayMovieDetails();
         m1.updateReleaseYear(1975);
         m1.checkAwardWinner(2024);
         System.out.println("The Movie is an award Winner.");

        }
}