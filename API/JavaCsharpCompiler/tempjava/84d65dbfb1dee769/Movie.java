public class Movie
{
    public void displayDetails(String title,int releaseYear)
    {
     System.out.println("Movie Title="+title);
     System.out.println(releaseYear);
    }
    public void updateReleaseYear(int newReleaseYear)
    {
      System.out.println("Movie Title="+title);
       System.out.println(newReleaseYear);
    }
    public void checkAwardWinner(int currentYear)
    {
     
    }
    public static void main(String [] args)
    {
        String title="The Godfather";
        int releaseYear="1972";
        int newReleaseYear="1975";
        int currentYear=
        displayDetails(title,releaseYear);  
        updateReleaseYear(title,newReleaseYear);
    }
}