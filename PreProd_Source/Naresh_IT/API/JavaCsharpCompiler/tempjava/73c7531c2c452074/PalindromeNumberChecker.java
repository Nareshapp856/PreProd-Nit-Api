public class PalindromeNumberChecker{
    int number;
    boolean isPalindrome;

    public void checkPalindrome()
    {
       int num=number,count=0,rev=0,rem;
       do{
          rem=num%10;
          rev=rev*10+rem;
          num/=10;
       }while(num!=0);
       if(number=rev)
       {
        isPalindrome=true;
        palindromeStatus();
       }
       else
       {
        isPalindrome=false;
        palindromeStatus();
       }
    }
    public void palindromeStatus()
    {
        if(isPalindrome==true)
        {
            System.out.println("The number is a palindrome "+number);
        }
        else
        {
            System.out.println("The number is not a palindrome"+number);
        }
    }
    
    public static void main(String args[])
    {
       PalindromeNumberChecker n1= new PalindromeNumberChecker();
       n1.number=121;
       n1.display();
    }
}