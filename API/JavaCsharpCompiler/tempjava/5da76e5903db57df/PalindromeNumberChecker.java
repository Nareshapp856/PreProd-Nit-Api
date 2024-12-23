public class PalindromeNumberChecker {
    
    private int number;
    private boolean isPalindrome;

    
    public PalindromeNumberChecker(int number) {
        this.number = number;
    }

    
    public void checkPalindrome() {
        int originalNumber = number;
        int reversedNumber = 0;
        int temp = originalNumber;

        while (temp > 0) {
            int digit = temp % 10;
            reversedNumber = reversedNumber * 10 + digit;
            temp /= 10;
        }

        isPalindrome = (originalNumber == reversedNumber);
    }

    
    public void palindromeStatus() {
        if (isPalindrome) {
            System.out.println("The number is a palindrome");
        } else {
            System.out.println("The number is not a palindrome");
        }
    }

    
    public static void main(String[] args) {
        
        System.out.println("Number: 121");
        PalindromeNumberChecker checker1 = new PalindromeNumberChecker(121);
        checker1.checkPalindrome();
        checker1.palindromeStatus();

        System.out.println();

        
        System.out.println("Number: 123");
        PalindromeNumberChecker checker2 = new PalindromeNumberChecker(123);
        checker2.checkPalindrome();
        checker2.palindromeStatus();
    }
}