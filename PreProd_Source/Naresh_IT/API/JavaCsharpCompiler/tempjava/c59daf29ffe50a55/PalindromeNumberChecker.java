public class PalindromeNumberChecker {
    private int number;
    private boolean isPalindrome;
    system.out.println("number",&number);
    public void checkPalindrome() {
        String str = Integer.toString(number);
        String reversed = new StringBuilder(str).reverse().toString();
        isPalindrome = str.equals(reversed);
    }

    public void palindromeStatus() {
        if (isPalindrome) {
            System.out.println("The number is a palindrome");
        } else {
            System.out.println("The number is not a palindrome");
        }
    }

    public static void main(String[] args) {
        PalindromeNumberChecker checker = new PalindromeNumberChecker();
        checker.number = ;
        checker.checkPalindrome();
        checker.palindromeStatus();

      
    }
}