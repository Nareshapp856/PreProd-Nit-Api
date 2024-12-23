public static PalindromeNumberChecker
{
    int number;
    boolean isPalindrome;
    public void checkPalindrome()
    {
        int number=121;
        int rev=0;
         int copy=number;
        do{ 
          digit=number%10;
        rev=(rev*10)+digit;
        number=number/10;   
        }while(number!=0);
        if(copy==number)
        {
          System.out.println("True");
        }
        else{
           System.out.println("False");
        }
    }
    public void palindromeStatus()
    {
       if(ispalindrome==num)
       {
        System.out.println("The number is a palindrome");
       }
       else{
         System.out.println("The number is not a palindrome");
       }
    }
    public void main(String[] args)
    {
      PalindromeNumberChecker p1=new PalindromeNumberChecker();
      p1.number=121;
      p1.isPalindrome=true;
      p1.palindromeStatus();

    }
}