class Movie{
    String title;
    int releaseYear;
    public void displayDetails(){
    System.out.println("The"+title);
    System.out.println("Year:"+releaseYear)

    }
    public void updateReleaseYear(int newReleaseYear)
    {
        int newyear=1975;
       System.out.println("The:"+title);
       System.out.println("Year:"+newyear);
    }
    public void checkAwardWinner(int currentYear){
        if(releaseyear<=currentYear||releaseyear-currentYear==20)
        System.out,println("true");

    }
    public static void main(Strin[] args){
        Movie m1=new Movie();
        m1.title="God Father";
        m1.releaseYear=1972;
        m1.displaydetails();
        m1.updateReleaseYear();
        m1.checkAwardWinner();
    }
}


    
