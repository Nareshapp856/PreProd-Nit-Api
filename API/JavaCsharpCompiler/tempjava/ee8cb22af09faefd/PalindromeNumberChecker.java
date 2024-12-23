public class PalindromeNumberChecker
{
    public boolean isPalindrome(int num)
    {
    int num1=num;
    while(num!=0)
    {
        rem=num%10;
        rev=(rev*10)+rem;
        num=num/10;
    }
    if(num1==rev)
    {
        System.out.println("The number is a palindrome");
    }
    else
    {
       System.out.println("The number is not a palindrome"); 
    }
    }
    public static void main(String[]args)
    {
        int num;
       
        //PalindromeNumber p1=new PalindromeNumber();
        isPalindrome(121);
        
    }
}