public class PalindromeNumberChecker{
    int number=121;
    boolean isPalindrome;
    public void checkPalindrome(){
        int rev=0,m;
        for(int t=number;t!=0;t=t/10){
            m=t%10;
            rev=(rev*10)+m;
        }
        if(rev==num){
            isPalindrome=true;
        }
        else{
            isPalindrome=false;
        }
    }
    public void PalindromeStatus(){
       if(isPalindrome){
         System.out.println("The number is palindrome ");
       }
       else{
         System.out.println("The number is not palindrome ");

       }
    }
    public static void main(String[]args){
        PalindromeNumberChecker p =  new PalindromeNumberChecker();
        p.PalindromeStatus();
    }

}