class Movie{
    String title;
    int releaseYear;
    public void displayDetails(){
   System.out.println("Movie Title: "+title+"Release Year: "+releaseYear);
    }
    public void updateReleaseYear(int newReleaseYear){
      System.out.println("After updating the release year:");
      releaseYear=newReleaseYear;
      System.out.println("Movie Title: "+title+"Release Year:"+releaseYear);
    }
    public void checkAwardWinner(int currentYear){
   System.out.println("Is the movie an award winner? ");
       if(currentYear>=20 &&currentYear<=20){
        System.out.println("true");
       }
       else{
        System.out.println("false");
       }
    }
    public static void main(String arg[]){
      Movie m=new Movie();
      m.title="The Godfather";
      m.releaseYear=1972;
      m.displayDetails();
      m.updateReleaseYear(1975);
      m.checkAwardWinner(2024);
    }
}