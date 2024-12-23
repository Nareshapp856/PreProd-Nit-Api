class PalindromeNumberChecker{
    boolean isPalindrome;
    int rev=0,digit=0,count=0;
    public void checkPalindrome(int number){
         while(number!=0)
         {
            digit=number%10;
            rev=(rev*10)+digit;
            number=number/10;
         }
         
    }
    public void palindromeStatus(){
        if(count==rev){System.out.println("The number is a palindrome");
}
      else { System.out.println("The number is not a palindrome"); }

    }
    public static main(String[]args){
    PalindromeNumberChecker a1=new PalindromeNumberChecker();
    a1.checkPalindrome(121);
    a1.palindromeStatus();
    }
}