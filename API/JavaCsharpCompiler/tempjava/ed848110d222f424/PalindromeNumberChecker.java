public class PalindromeNumberChecker {
    int number = 123;
    boolean isPalindrome;
    public void checkPalindrome(){
        int rev = 0,r;
        int dup = number;
        while(dup!=0){
            r = dup%10;
            rev = rev * 10 + r;
            dup=dup/10;
        }
        if(rev == number){
            isPalindrome = true;
        }
        else{
            isPalindrome = false;
        }
    }
    public void palindromeStatus(){
        if(isPalindrome){
            System.out.println("The number is a palindrome");
        }
        else{
            System.out.println("The number is not a palindrome");
        }
    }
    public static void main(String []args){
        PalindromeNumberChecker p1 = new PalindromeNumberChecker ();
        p1.checkPalindrome();
        p1.palindromeStatus();
    }
}