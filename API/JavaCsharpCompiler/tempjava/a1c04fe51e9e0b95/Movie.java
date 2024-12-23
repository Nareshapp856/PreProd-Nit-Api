class movie 
{
    String title;
    int releaseYear;
    public void displayDetails()
    {
        System.out.peintln("title="+title);
        System.out.println("releaseYear"+releaseYear);

    }
    public void updateRelease(int newReleaseYear)
    {
        updateReleaseyear=newReleaseYear;
    }
    public static void main(String args[])
    {
        movie m=new movie();
        m.title=The Godfather;
        m.releaseYear=1972;
        m.displayDetails();
        m.updateRelease(1975);

    }
}