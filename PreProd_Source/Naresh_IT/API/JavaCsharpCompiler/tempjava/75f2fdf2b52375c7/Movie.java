class Movie{
    String title;
    int releaseYear;
    public void displayDetails(){
        System.out.println("Movie Title: "+title+", Release Year: "+releaseYear);
    }
    public void updateReleaseYear(int newReleaseYear){
        System.out.println("After updating the release year:");
        System.out.println("Movie Title: "+title+", Release Year: "+newReleaseYear);
    }
    public void checkAwardWinner(int currentYear){
        boolean win ;
        System.out.print("Is the movie an award winner?");
        if(currentYear >=newReleaseYear+20){
           win = true;
          } else{
           win = false;
         }
            System.out.print(win);
    }
    public static void main(String [] args){
        Movie m1 = new Movie();
        m1.displayDetails();
        m1.updateReleaseYear(1975);
        m1.checkAwardWinner(2024);

    }
}