class Book{
    String title=The_Great_Gatsby;
    int yearPublished=1925;
    Boolean checkClassic=true;
    public void displayDetails(){
        System.out.println("Book Title:"+title);
        System.out.println("Year Published"+yearPublished);

    }
    public void updateYear(int newYear){
        System.out.println("Book Title:"+title);
        System.out.println("Year Published"+yearPublished);

    }
    public void checkClassic(int currentYear){
        if(currentYear<=50)
        System.out.println("currentYear");
return true;
else
{
    return false;
}
    }
    public static void main(String []args){
        Book b1=new Book();
        System.out.println("main starts");
        b1.displayDetails();
        b1.updateYear(1925);
        b1.checkClassic();
    }
}