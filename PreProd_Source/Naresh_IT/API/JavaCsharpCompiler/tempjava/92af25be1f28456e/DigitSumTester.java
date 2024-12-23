import java.util.Scanner;

class DigitSum {
    
    private int num;

    
    public DigitSum(int num) {
        this.num = num;
    }

    
    public int getNthDigitFromRight(int position) {
        int tempNum = num;
        for (int i = 1; i < position; i++) {
            tempNum /= 10;
        }
        return tempNum % 10;
    }

    
    public int addFirstAndNthDigit(int position) {
        int firstDigit = getFirstDigit();
        int nthDigit = getNthDigitFromRight(position);
        return firstDigit + nthDigit;
    }

    
    private int getFirstDigit() {
        int tempNum = num;
        while (tempNum >= 10) {
            tempNum /= 10;
        }
        return tempNum;
    }

    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();

        System.out.print("Enter the position (n): ");
        int position = scanner.nextInt();

        
        DigitSum digitSum = new DigitSum(number);

        
        try {
            int result = digitSum.addFirstAndNthDigit(position);
            System.out.println("The result of adding the first digit and the " + position + "th digit is: " + result);
        } catch (Exception e) {
            System.out.println("Invalid position. Please ensure it is within the range of the number's digits.");
        }

        scanner.close();
    }
}
