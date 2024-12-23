public class PallindromeNumberChecker
{
    int number;
    boolean isPallindrome;
    public void checkPallindrome()
    {
       
        while(number!=0)
        {
            int digit=number%10;
            int reverse=reverse*10+digit;
            number/=10;
        }
        if(number==reverse)
        {
            return true;
        }
        else
        return false;
    } 
    public void palindromeStatus()
    {
        if(isPallindrome==true)
        {
            System.out.println("The number is a pallindrome");
        }
        else{
            System.out.prinltn("Not a pallindrome number");
        }
    }
    public static void main(String []args)
    {
     PallindromeNumberChecker p1=new PallindromeNumberChecker();
     p1.number=121;
     p1.palindromeStatus();   
    }
    
}