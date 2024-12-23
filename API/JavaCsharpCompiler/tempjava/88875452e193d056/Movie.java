class Movie{

    String title;
    int releaseYear;

    public void displayDetails(){
        System.out.printf("Movie Title:"+title);
        System.out.printf(",Release Year:"+releaseYear);
    }
    public void updateReleaseYear(int newReleaseYear){
        System.out.println("After updating the release year:");
        System.out.printf("Movie Title:"+title);
        System.out.printf(",Release Year:"+newReleaseYear);
    }
    public void checkAwardWinner(int currentYear){
        
        if(releaseYear<=currentYear){
    System.out.println("Is the movie an award winner? true");  
        }
    }
    public static void main(String[] args){
        int newyear,currentyear;
        newyear=1975;
        currentyear=2024;
        Movie m1=new Movie();
        m1.title="The Godfather";
        m1.releaseYear=1972;

        m1.displayDetails();
        m1.updateReleaseYear(newyear);
        m1.checkAwardWinner(currentyear);
    }
}