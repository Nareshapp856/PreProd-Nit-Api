public class Movie
{ 
    String title;
    int releaseYear;
  
    public void displayDetails()
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
        System.out.println("True");
        else
        System.out.println("False");
    }
    public static void main(String [] args)
    {
        Movie ob=new Movie();
        ob.title="The Godfather";
        ob.displayDetails();
        ob.updateReleaseYear();
   
       
        
    }
}