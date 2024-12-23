public class DigitSum{
    public int getNthDigitFromRight(int position){
        int digit = 0;
        for(int i = 1; i <= position; i++) {
            digit = num % 10;
            num/=10;
        }
        return digit;
       
    }
    public void addFirstAndNthDigit(int position){

    }
    public static void main(String []args){
    int number = 2457;
    int position = 3;

    //System.out.println(getNthDigitFromRight(position));
    System.out.println(addFirstAndNthDigit(position));

    }
}