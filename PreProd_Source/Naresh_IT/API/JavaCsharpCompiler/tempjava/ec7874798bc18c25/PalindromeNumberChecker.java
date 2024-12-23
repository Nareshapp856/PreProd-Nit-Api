public class PalindromeNumberChecker{
    boolean isPalindrome;
    int rev=0,digit=0,count=0;
    int number;
    public void checkPalindrome(){
         while(number!=0)
         {
            digit=number%10;
            rev=(rev*10)+digit;
            number=number/10;
         }
         
    }
    public void palindromeStatus(){
        if(count==rev){
            System.out.println(rev+"The number is a palindrome");
           }
      else { 
        System.out.println(rev+"The number is not a palindrome");

          }
    }
    public static void main(String[]args){
    PalindromeNumberChecker a1=new PalindromeNumberChecker();
    a1.checkPalindrome();
    a1.palindromeStatus();
    }
}