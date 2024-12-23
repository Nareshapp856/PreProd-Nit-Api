 public class PalindromeNumberChecker{
    int num;
    boolean isPalindrome;
    public  void checkPalindrome()
    {
       int digit=num%10;
       int rev=(rev*10)+digit;
       num=num/10; 
    }
    public  void palindromeStatus()
    {
if(num==rev)
{
    System.out.println("It is palindorme");
}
else
{
    System.out.println("It is not apalindorme");
}
    }
    public static void main(String[] args){
      PalindromeNumberChecker.p1=new PalindromeNumberChecker(); 
      p1.num=121;
      checkPalindrome();
       palindromeStatus();
    }
}