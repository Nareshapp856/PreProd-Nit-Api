public class  PalindromeNumberChecker
{
    public static void main(String[]args)
    {
        int number=121;
        boolean result=isPalindrome(number);
        if(result){
        System.out.println(number+:"Number is a palindrome");
        }
        else{
            System.out.println(number+:"Number is not palindrome");
        }
    }


 public static boolean isPalindrome(int num)
 {
    int original=num;//121
    reverse=0;
    int digit=num%10;//1
    reversed=reversed*10+digit;//1
    num=num/10;//12

    return original==reversed;
 }
 
 }

 