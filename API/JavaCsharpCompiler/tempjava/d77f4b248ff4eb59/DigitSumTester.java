class DigitSum {

    public static int getNthDigitFromRight(int num, int position) {
        String numStr = String.valueOf(num); 
        int length = numStr.length();
        if (position > length || position < 1) {
            throw new IllegalArgumentException("Invalid position");
        }
        return Character.getNumericValue(numStr.charAt(length - position));
    }

    public static int addFirstAndNthDigit(int num, int position) {
        String numStr = String.valueOf(num); 
        int firstDigit = Character.getNumericValue(numStr.charAt(0)); 
        int nthDigit = getNthDigitFromRight(num, position); 
        return firstDigit + nthDigit;
    }

    public static void main(String[] args) {
        int number = 12345; 
        int position = 3;   

        try {
            int result = addFirstAndNthDigit(number, position);
            System.out.println("The sum of the first digit and the " + position + "th digit from the right is: " + result);
        } 
    }
}
