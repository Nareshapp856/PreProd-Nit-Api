public class PalindromeNumberChecker {
    int number;
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
    
}