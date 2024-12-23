public class PalindromeNumberChecker {
 
    private int number;
    private boolean isPalindrome;

    
    public PalindromeNumberChecker(int number) {
        this.number = number;
        this.isPalindrome = false;
    }

   
    public void checkPalindrome() {
        int originalNumber = number;
        int reversedNumber = 0;

        while (originalNumber > 0) {
            int digit = originalNumber % 10;
            reversedNumber = reversedNumber * 10 + digit;
            originalNumber /= 10;
        }

        
        isPalindrome = (reversedNumber == number);
    }

    public void palindromeStatus() {
        if (isPalindrome) {
            System.out.println("The number is a palindrome");
        } else {
            System.out.println("The number is not a palindrome");
        }
    }



  
    public static void main(String[] args) {
     
        PalindromeNumberChecker checker1 = new PalindromeNumberChecker(121);
        checker1.checkPalindrome();
        System.out.println("Number: " + checker1.number);
        checker1.palindromeStatus();

        PalindromeNumberChecker checker2 = new PalindromeNumberChecker(123);
        checker2.checkPalindrome();
        System.out.println("Number: " + checker2.number);
        checker2.palindromeStatus();
   }
}