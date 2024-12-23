class Movie
{
    String title;
    int ReleaseYear;
    public void updateReleaseYear(int newReleaseYear) 
    {
     System.out.println("After updating the release year:");
     System.out.println("Movie Title:"+title+"Release Year:"+ReleaseYear);
    }
    public void checkAwardWinner(int currentyear)
    {
        int final=ReleaseYear-updateReleaseYear;
      if(currentyear>20)
      {
        System.out.println("Is the movie an award winner? true");  
       
      }
      else
      {
       System.out.println("the movie might have won awards by now."); 
      }
    }
    public void displayDetails()
    {
     System.out.println("Movie Title:"+title+"Release Year:"+ReleaseYear);
     //System.out.println("Movie Title"+);
    }
public static void main(String []args)
{
    Movie m=new Movie();
    m.title="The Godfather";
    m.ReleaseYear=1972;
    m.displayDetails();
    m.updateReleaseYear(1975); 
    m.checkAwardWinner();

}
}