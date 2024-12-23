 public class PalindromeNumberChecker{
    int num, rev=0,copy,digit;
    public  void  checkPalindrome(int num)
    {
        copy=num;
        while(num!=0)
        {
            
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
            p1.num=123;
            p1.checkPalindrome(p1.num);
            p1.palindromeStatus();
            

        }
    

}