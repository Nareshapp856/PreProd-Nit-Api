class CalculationBase{
    int num1,num2;
    public CalculationBase(int num1, int num2){
        this.num1=num1;
        this.num2=num2;
    }

    public void performCalculation(int num1, int num2){
        int sum = num1 + num2;
        System.out.println("Addition of two number are :" + sum);

    }
}

class AdvancedCalculation extends CalculationBase{
    double additionalNum;
    String operation;
    public AdvancedCalculation(int num1, int num2, double additionalNum, String operation){
        super(num1,num2);
        this.additionalNum=additionalNum;
        this.operation=operation;
    }

    public void performAdvancedCalculation(){
        double complexCal = num1+num2+additionalNum;
        System.out.println("complexCalculation is :" + complexCal + " " + "Addition");
    }
}


public class CalculationBaseTester{
    public static void main(String ages[]){
        AdvancedCalculation ad = new AdvancedCalculation(1,2,3.4,"Addition");
        ad.performCalculation(1,2);
        ad.performAdvancedCalculation();

    }
}
