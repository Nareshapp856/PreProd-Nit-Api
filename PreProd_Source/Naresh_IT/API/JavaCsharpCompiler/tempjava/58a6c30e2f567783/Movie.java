public class Movie 
{
    String title;
    int releaseYear;
    public void displayDetails()
    {
        System.out.println("title="+title);
        System.out.println("releaseYear"+releaseYear);

    }
    public void updateRelease(int newReleaseYear)
    {
        int updateReleaseyear=newReleaseYear;
    }
    public static void main(String args[])
    {
        Movie m=new Movie();
        m.title="TheGodfather";
        m.releaseYear=1972;
        m.displayDetails();
        m.updateRelease(1975);

    }
}