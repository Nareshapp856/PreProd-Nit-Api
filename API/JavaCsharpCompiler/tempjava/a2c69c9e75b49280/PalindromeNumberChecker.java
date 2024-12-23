public class PalindromeNumberChecker{
    int number;
    boolean isPalindrome;
    public void checkPalindrome(){
        
        int number;
        int copy=num;
        int rev=0;
        int digit;
        do{
            digit=number%10;
            rev=rev*10+digit;
            number=number/10;
        }while(number!=0);
        if(copy==rev){
            isPalindrome=true;
        }else{
            isPalindrome=true;
        }
    }
    public void palindromeStatus(){
        if(isPalindrome==true){
            System.out.println("The number is a palindrome")
        }else{
            System.out.println("The number is not a palindrome")
        }
    }
    public static void main(String []args){
        PalindromeNumberChecker p1=new PalindromeNumberChecker();
        p1.number=121;
        p1.checkPalindrome();
        p1.palindromeStatus();
    }
}