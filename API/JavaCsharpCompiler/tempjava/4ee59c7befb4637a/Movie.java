class Movie{
    String title;
    int releaseYear;
    int newReleaseYear;
    int currentYear;
    public void updateReleaseYear(int newReleaseYear){
        releaseYear =newReleaseYear;
        System.out.println("After updating the release year:");
         System.out.println("Movie Title: "+title+", Release Year: "+releaseYear);
    }
    public void checkAwardWinner(int currentYear){
        if(currentYear-20<=releaseYear){
            System.out.println("Is the movie an award winner? true");
        }
        else{
            System.out.println("Is the movie an award winner? false");
        }
        
    }
     public void displayDetails(){
        System.out.println("Movie Title: "+title+", Release Year: "+releaseYear);
        updateReleaseYear(newReleaseYear);
        checkAwardWinner(currentYear);
    }
    public static void main(String []args ){
        Movie m1 = new Movie();
        m1.title="The Godfather";
        m1.releaseYear =1972;
        m1.newReleaseYear=1975;
        m1.currentYear =2024;
        m1.displayDetails();
    }
    
}
