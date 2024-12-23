public class  PalindromeNumberChecker
{

    public static boolean isPalindrome(int num)
   {
    int original=num;//121
    int reversed=0;
    int rem=0;
    int digit=num%10;//1
    reversed=reversed*10+rem;//1
    num=num/10;//12

    return original==reversed;
    }


    public static void main(String[]args)
    {
        int number=121;
        boolean result=PalindromeNumberChecker.isPalindrome(number);

        if(result)
        {
        System.out.println(number+:"Number is a palindrome");
        }
        else
        {
            System.out.println(number+:"Number is not palindrome");
        }
    }


 
 
 }

 