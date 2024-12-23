public class Movie{
    String title;
    int releaseYear;
    public void displayDetalis(){
     Movie m1 = new Movie();
        m1.title="The Godfather";
        m1.releaseYear=1972;
        System.out.print("Movie title:"+m1.title);
        System.out.println(",Release Year:"+m1.releaseYear);
    }
    public void updateReleaseYear(){
        int newReleaseYear=1975;
        System.out.print("Movie title:");
        System.out.println(",Release Year:"+newReleaseYear);
    }
    public void checkAwardwinner(int currentYear){
      if(currentYear-releaseYear>=20)
      System.out.println("Is the movie an award winner?true");
      else System.out.println("Is the movie an award winner?false");}
      public static void main(String[]args){
        displayDetalis();
        updateReleaseYear();
        checkAwardwinner();
      }
    
}