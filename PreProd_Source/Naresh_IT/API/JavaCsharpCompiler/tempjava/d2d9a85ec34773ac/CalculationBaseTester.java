
class CalculateBase{
    int num1;
    int num2;
    CalculateBase(int num1,int num2){
        this.num1=num1;
        this.num2=num2;
    }

    public void performCalculation(){
        System.out.println("Addtion of two Number:"+(num1+num2));
    }
}

class advanceCalculation extends CalculateBase{
    int num3;
    int num4;
    double additionalNum;
    String operation;
    advanceCalculation(int num1,int num2,int num3,int num4,double additionalNum,String operation){
        super(num1,num2);
        this.num3=num3;
        this.num4=num4;
        this.additionalNum=additionalNum;
        this.operation=operation;
    }
    public void performAdvanceCalculation(){
        System.out.println("Advance Calculation is:"+num1+num2+num3+num4+additionalNum+operation);
    }
}
public class CalculationBaseTester{
    public static void main(String args[]){
        advanceCalculation adv=new advanceCalculation(4,6,7,8,13.5,"Addition");
        adv.performCalculation();
        adv.performAdvanceCalculation();
    }
}


