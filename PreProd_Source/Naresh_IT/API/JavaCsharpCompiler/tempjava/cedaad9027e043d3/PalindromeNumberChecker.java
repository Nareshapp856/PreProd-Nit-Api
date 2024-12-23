public class PalindromeNumberChecker {
    private int number;
    private boolean isPalindrome;

    

    public void checkPalindrome() {
        int reversed = 0;
        int original = number;
        while (number != 0) {
            int digit = number % 10;
            reversed = reversed * 10 + digit;
            number /= 10;
        }
        number = original;
        isPalindrome = (original == reversed);
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
        System.out.println("Number: " + checker1.number);
        checker1.checkPalindrome();
        checker1.palindromeStatus();

        PalindromeNumberChecker checker2 = new PalindromeNumberChecker(123);
        System.out.println("Number: " + checker2.number);
        checker2.checkPalindrome();
        checker2.palindromeStatus();
    }
}