public class PalindromeNumberChecker
{
public static void main(String[]args)
{
    int number=121;
    boolean result=chekpalindrome(number);
    if(result){
        System.out.println(number+"The number is a palindrome");
    }
    else{
        System.out.println(number+"The number is not a palindrome");

    }
}
public static chekpalindrome(int num){
    int org=num;
    int rev=0;
    while(num!=0)
    {
        int digit=num%10;
        rev=rev*10+digit;
        num=num/10;
    }
    returm org==rev;
}
}



    

 