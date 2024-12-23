 public class PalindromeNumberChecker{
    int num=121, rev=0,copy,digit;
    public  void  checkPalindrome(int num)
    {
        while(num!=0)
        {
            copy=num;
            digit=num%10;
            rev=(rev*10)+digit;
            num=num/10;

        }
        }
        public  void  palindromeStatus()
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
            // int num;
            PalindromeNumberChecker p1= new PalindromeNumberChecker();
            p1.checkPalindrome(num);
            palindromeStatus();

        }
    

}