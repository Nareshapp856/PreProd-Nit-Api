class Palindrome{
    int num;
    public void ispalindrome(int num){
        int rev=0;
        int digit;
        int s=num;
        do{
            digit=num%10;
            rev=(rev*10)+digit;
            num=num/10;
        }
        while(num!=0);
        if(rev==s){
            System.out.println(num+"Is a palindrome");
        }
        else
        {
            System.out.println(num+"Is not a palindrome");
        }
    }
    
}
public class PalindromeNumberChecker{
public static void main(String[]args){
        Palindrome p1=new Palindrome();
        p1.ispalindrome(126);
    }
}