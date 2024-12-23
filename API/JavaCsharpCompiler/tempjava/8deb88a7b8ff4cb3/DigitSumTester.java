public class DigitSumTester{
    int num=123;
    public  void  getNthDigitFromRight(int position){
         for(int i=1;i<=num;i++){
            if(position==i){
                System.out.println(i);
            }
         }
         
    }
    
    public void addFirstAndNthDigit(int position){

    }
}
public static void main(String [] args){
    DigitSumTester ds=new DigitSumTester();
    ds.getNthDigitFromRight(2)
}