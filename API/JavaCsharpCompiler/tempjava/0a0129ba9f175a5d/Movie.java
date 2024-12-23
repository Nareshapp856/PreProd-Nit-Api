public class Movie
{
    String Title;
    int year;
    public void DisplayDetails()
    {
        System.out.println("Title of the Movie : "+Title);
        System.out.println("Realse year of the Movie : "+year);
    }
    public void updateReleaseYear(int newyear)
    {
          newyear = year;
         System.out.println("Update Year Is : "+newyear);
    }
    public void checkAwardWinner(int currentyear)
    {
        if(year<=2024)
        {
            System.out.println("Award Winning Moive : "+true);
        }
        else
        {
            System.out.println("Award Winning Moive"+false);
        }
    }
    public static void main(String []args)
    {
        Movie  m1=new Movie();
        m1.Title="God-Father";
        m1.year=1972;
        m1.DisplayDetails();
        m1.updateReleaseYear(1975);
        m1.checkAwardWinner(2024);

    }
}