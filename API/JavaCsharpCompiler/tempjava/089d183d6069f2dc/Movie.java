public class Movie{
    String title;
    int releaseYear;

    public void displayDetails()
    {
        System.out.print("Movie Title: "+title);
        System.out.print(",Released Year: "+releaseYear);
    }
    public void updateReleaseYear(int year)
    {
        releaseYear = year;
    }

    public boolean checkAwardWinner(int currentYear){
        int diff = currentYear - releaseYear;
        if(diff > 20)
        {
           return true;
        }
        return false;
    }
        public static void main(String a[])
        {
            Movie obj = new Movie();
            obj.title = "The Godfather";
            obj.releaseYear = 1972;

            obj.displayDetails();
            obj.updateReleaseYear(1975);
            System.out.println("After updating the release year:");
            obj.displayDetails();
            System.out.println("Is the movie an award winner? "+obj.checkAwardWinner(obj.releaseYear));

            
        }
}
