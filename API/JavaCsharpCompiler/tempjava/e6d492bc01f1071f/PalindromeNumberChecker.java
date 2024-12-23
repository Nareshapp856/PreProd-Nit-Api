public class  PalindromeNumberChecker
{
    public static void main(String[]args){
        int number=121;
        boolean result=isPalindrome(number);
        if(result){
        System.out.println(number+:"Number is a palindrome");}
        else{
            System.out.println(number+:"Number is not palindrome");
        }
    }
}

 public static boolean isPalindrome(int num){
    int original=num;
    reverse=0;
    int digit=num%10;
    reversed=reversed*10+digit;
    num=num/10;
 }
 return original==reversed;
 }
 }


}