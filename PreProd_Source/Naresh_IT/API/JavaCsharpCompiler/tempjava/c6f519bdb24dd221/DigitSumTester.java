public class DigitSumTester{
    int number;
    int position;
    public int getNthDigitFromRight(int position){
       
        for(int i = 1; i <= position; i++) {
           int digit = num % 10;
            number/=10;
        }
        return digit;
       
    }
    public void addFirstAndNthDigit(int position){

    }
    public static void main(String []args){
    DigitSumTester d1 = new DigitSumTester();
    d1.number = 34567;
    d1.position = 3;

    //System.out.println(getNthDigitFromRight(position));
    System.out.println(d1.addFirstAndNthDigit(d1.position));

    }
}