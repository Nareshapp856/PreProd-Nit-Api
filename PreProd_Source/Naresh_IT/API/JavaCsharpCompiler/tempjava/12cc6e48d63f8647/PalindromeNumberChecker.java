public class  PalindromeNumberChecker
{

    int number=121;

    public boolean isPalindrome (int n)
    {
        if(n==1)
        {
            System.out.println("Number is palindrome");
        }
        else{
            System.out.println("Number is not palindrome");
        }

    }

     public void checkPalindrome()
     {
        int rev=0;
        int copy=number;
        do
        {
            int digit=number%10;
            rev=(rev*10)+digit;
            number=number/10;


        }while(number!=0);

        if(copy==rev)
        {
            isPalindrome(1);

        }
        else
        {
            isPalindrome(0);
        }




     }


    public static void main(String[] args)
    {
        
        PalindromeNumberChecker ob= new PalindromeNumberChecker();
        ob.checkPalindrome();
        


    }



}