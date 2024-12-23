public class Movie{
    String title;
    int releaseYear;

    public void displayDetails(){
        System.out.println("Movie Title: "+title);
        System.out.println("Release Year:"+releaseYear);
    }

    public void updateReleaseYear(int newReleaseYear){
        int update = newReleaseYear;
        System.out.println("Movie Title: "+ title);
        System.out.println("Release Year: "+update);

    }

    public void checkAwardWinner(int currentYear){
        if(currentYear > releaseYear){
            System.out.println("Is the movie an award winner?true");
        }else{
            System.out.println("Is the movie an award winner?false");
        }
        
    }

    public static void main(String[] args){
        Movie Mi = new Movie();
        Mi.title="The Godfather";
        Mi.releaseYear=1972;

        Mi.displayDetails();
        Mi.updateReleaseYear(1975);
        Mi.checkAwardWinner(2024);

    }
}