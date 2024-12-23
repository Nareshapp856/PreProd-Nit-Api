class Movie
{
    public void displayDetails(String title,int releaseYear)
    {
      return title;
      return releaseYear;
    }
    public void updateReleaseYear(int newReleaseYear)
    {

    }
    public void checkAwardWinner(int currentYear)
    {

    }
    public static void main(String [] args)
    {
        String title="The Godfather";
        int releaseYear="1972";
        displayDetails(title,releaseYear);
        System.out.println("Movie Title="+title);
        System.out.println(releaseYear);
        
    }
}