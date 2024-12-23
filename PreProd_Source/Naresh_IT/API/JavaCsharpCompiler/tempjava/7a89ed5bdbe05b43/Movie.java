public class Movie{
    String title;
    int releaseYear;
    public static void displayDetalis(){
     Movie m1 = new Movie();
        m1.title="The Godfather";
        m1.releaseYear=1972;
        System.out.print("Movie title:"+m1.title);
        System.out.println(",Release Year:"+m1.releaseYear);
        System.out.print(" ");
    }
    public static void updateReleaseYear(){
        Movie m1 = new Movie();
        m1.title="The Godfather";
        int newReleaseYear=1975;
        System.out.print("Movie title:"+m1.title);
        System.out.println(",Release Year:"+newReleaseYear);
           System.out.print(" ");
    }
    public static void checkAwardwinner(int currentYear){
        int releaseYear=1972;
      if(currentYear-releaseYear>=20)
      System.out.println("Is the movie an award winner?true");
      else System.out.println("Is the movie an award winner?false");}
      public static void main(String[]args){
        displayDetalis();
        updateReleaseYear();
        checkAwardwinner(2024);
      }
    
}