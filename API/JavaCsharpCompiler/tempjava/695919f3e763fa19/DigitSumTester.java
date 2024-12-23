public class DigitSum {

    
    private int num;
    
    public DigitSum(int num) {
        this.num = num;
    }

    public int getNthDigitFromRight(int position) {
        String numStr = String.valueOf(num); 
        int length = numStr.length();
        if (position > length || position < 1) {
            throw new IllegalArgumentException("Invalid position");
        }
        return Character.getNumericValue(numStr.charAt(length - position));
    }

    
    public int addFirstAndNthDigit(int position) {
        String numStr = String.valueOf(num); 
        int firstDigit = Character.getNumericValue(numStr.charAt(0)); 
        int nthDigit = getNthDigitFromRight(position); 
        return firstDigit + nthDigit;
    }

    public static void main(String[] args) {
       
        int number = 12345; 
        int position = 3;   
        DigitSum digitSum = new DigitSum(number);

        
        try {
            int result = digitSum.addFirstAndNthDigit(position);
            System.out.println("The sum of the first digit and the " + position + "th digit from the right is: " + result);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}
