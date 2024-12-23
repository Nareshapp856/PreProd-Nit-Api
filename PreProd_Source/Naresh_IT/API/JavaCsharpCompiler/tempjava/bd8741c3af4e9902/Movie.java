class Movie()
{
    String title;
    int releaseYear;
    public void displayDetails() 
    {    
        String title="RThe Godfather";
        int releaseYear=1972;
        System.out.println("title"+title);
         System.out.println("Releaseyear"+releaseYear);
    }
    public void updateReleaseYear(int newReleaseYear)
    {   
        String title="RThe Godfather";
        int releaseYear=1975;
        System.out.println("title"+title);
         System.out.println("Releaseyear"+releaseYear);
    }
    public void checkAwardWinner(int currentYear)
    {
       if(newReleaseYear<=(currentYear-20))
       {
       System.out.println("TRUE")}
       else{System.out.println("false")
       }
 }
    public static void main(String[]args)
    {   
        Movie m1=new Movie();
        m1.displayDetails(); 
        m1.updateReleaseYear(int newReleaseYear);
        m1.checkAwardWinner(int currentYear);
    }
}