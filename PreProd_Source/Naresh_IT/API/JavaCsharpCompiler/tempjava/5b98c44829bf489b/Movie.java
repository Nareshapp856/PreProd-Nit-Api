public class Movie
{
    public void displayDetails(String title,int releaseYear)
    {
     System.out.println("Movie Title:"+title);
     System.out.println("Release Year:"+releaseYear);
    }
    public void updateReleaseYear(int newReleaseYear)
    {
       System.out.println("Movie Title:"+title);
       System.out.println("Release Year:"+newReleaseYear);
    }
    public void checkAwardWinner(int currentYear)
    {
    if (currentYear>20)
    }
    public static void main(String [] args)
    {
        Movie ob=new Movie();
        ob.title=
        String title="The Godfather";
        int releaseYear=1972;
        int newReleaseYear=1975;
        int currentYear=
        displayDetails(title,releaseYear);  
        updateReleaseYear(title,newReleaseYear);
    }
}