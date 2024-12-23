public class Movie 
{
    String title;
    int releaseYear;
    public void displayDetails()
    {
        System.out.println("title="+title);
        System.out.println("releaseYear="+releaseYear);

    }
    public void updateRelease(int newReleaseYear)
    {
        int updateReleaseyear=newReleaseYear;
        System.out.println("title="+title);
        System.out.println("updateRelease="+updateReleaseyear);
    }
     public boolean checkAwardWinner( boolean value) 
     {
        if(value==true)
        System.out.println("Is the movie an award winner? true");
        else if(value==false)
        System.out.println("Is the movie an award winner? true");
   return true; }
    public static void main(String args[])
    {
        Movie m=new Movie();
        m.title="TheGodfather";
        m.releaseYear=1972;
        m.displayDetails();
        m.updateRelease(1975);
        m.checkAwardWinner(false);
    

    }
}