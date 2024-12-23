public class Movie{
    String title;
    int releaseYear;
    public void displayDitails(){
        System.out.println("the title of the movie is"+title);
        System.out.println("relese yeaar of movie is"+releaseYear);
    }
    public  void updateReleaseYear(int newReleaseYear){
        int newYear=1975;
        System.out.println("the update release year is");
    }   
    public void checkAwardWinner(int currentYear){  
    } 
    Movie m1=new Movie();
    String title="The Godfather";
    int releaseYear=1972;
    m1.displayDitails();
    m1.updateReleaseYear(1975);
    }


