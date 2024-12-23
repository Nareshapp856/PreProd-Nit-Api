 public class PalindromeNumberChecker{
    int num,rev=0,copy,digit;
    public static void  checkPalindrome()
    {
        if(num!=0)
        {
            copy=num;
            digit=num%10;
            rev=(rev*10)+digit;
            num=num/10;

        }
        }
        public static void  palindromeStatus()
        {
            if(copy==rev)
            {
                System.out.println("The number is a palindrome");

            }
            else{
                System.out.println("The number is not a palindrome");
            }
        }
        public static void main(String []args)
        {
            
            palindromeStatus();
            palindromeStatus();

        }
    

}