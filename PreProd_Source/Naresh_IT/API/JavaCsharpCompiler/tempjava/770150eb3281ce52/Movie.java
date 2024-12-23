class Movie
{
    String title;
    int releaseyear;
    public static void displayDetails(String title,int releaseyear)
    {
        System.out.println("Movie Title: "+title+",Releaseyear: "+releaseyear);
    } 
    public void static updateReleasedateyear(int newreleasedat)
    {int newreleasedat=1975;
        System.out.println("After updating the release year:");
                System.out.println("Movie Title: "+title+",Releaseyear: "+newreleaseyear);
    }
    public static void checkAwardWinner(int currentYear)
    {
        int win=(currentYear-newreleaseyear);
        if(win>=20)
        {
            System.out.println("Is the movie an award winner? true");
        }
        else
        {
            System.out.println("Is the movie an award winner? false");
        }
    }
    public static void main(String[] args)
    {
        Movie.displayDetails(Godfather,1972);
        Movie.updateReleasedateyear(1975)
        Movie.checkAwardWinner(2024);
    }
}