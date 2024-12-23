 public class PalindromeNumberChecker{
    int num, rev=0,copy,digit;
    public  void  checkPalindrome()
    {
        if(num!=0)
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
        public  void main(String []args)
        {
            int num;
            checkPalindrome();
            palindromeStatus();

        }
    

}