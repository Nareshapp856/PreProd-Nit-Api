public class PalindromeNumberChecker{
   int num;
    int rev=0;
    int on=num;
    public static void checkPalindrome(){
        while(num!=0){
           int r=num%10;
           rev=rev*10+r;
           num=num/10; 
        }
        if(on==rev)
         System.out.println("The number is a palindrome");
        else
         System.out.println("The number is not a palindrome");
    }
    public static void main(String [] args){
        
        checkPalindrome();

    }

}