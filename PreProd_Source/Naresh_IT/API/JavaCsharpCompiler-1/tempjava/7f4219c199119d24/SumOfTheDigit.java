import java.util.Scanner;

public class SumOfTheDigit {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Input the number from user
        System.out.print("Enter an integer: ");
        int number = scanner.nextInt();

        int sum = 0;
        int n = Math.abs(number);  // To handle negative numbers

        // Process each digit
        for (; n != 0; n /= 10) {
            int digit = n % 10;    // Get the last digit
            sum += digit;          // Add it to the sum
        }

        // Output the result
        System.out.println("Sum of the digits of " + number + " is: " + sum);

        scanner.close();
    }
}
