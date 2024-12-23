class Calculation{
    int num1;
    int num2;
    public Calculation(int num1,int num2){
        this.num1=num1;
        this.num2=num2;
    }
    public int performCalculation(){

return num1+num2;
    }
}
class AdvancedCalculation extends Calculation{
    double addnum;
    String operation;
    public AdvancedCalculation(int num1,int num2,double addnum,String operation){
        super(num1,num2);
        this.addnum=addnum;
        this.operation=operation;
    }
    public int performAdvancedCalculation() {
        super.performCalculation();
       return  55;
    }
}
public class CalculationBaseTester{
    public static void main(String []args){
        Calculation c=new Calculation(2,2);
        System.out.println("sum is: "+performCalculation());
    }
}