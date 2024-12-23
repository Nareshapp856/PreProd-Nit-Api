 public class PalindromeNumberChecker{
    int num=121;
    int copy=num;
    int digit;
    int rev;
    boolean isPalindrome;
    public  void checkPalindrome()
    {
     digit=num%10;
     rev=(rev*10)+digit;
       num=num/10; 
       palindromeStatus();
    }
    public  void palindromeStatus()
    {
if(copy==rev)
{
    System.out.println("It is palindorme");
}
else
{
    System.out.println("It is not a palindorme");
}
    }
    public  void main(String[] args){
      
      checkPalindrome();
       
    }
}