class CalculationBase
{
    int num1=10;
    int num2=20;
    public CalculationBase(int num1,int num2)
    {
        this.num1=num1;
        this.num2=num2;
    }
    public void performCalculation()
    {
        int result=num1+num2;
        System.out.println("the result of the given number is:"+result);
    }
}
class AdvancedCalculation extends CalculationBase{
    double additionalNum;
    String operation;
    public AdvancedCalculation(int num1,int num2,double additionalNum, String operation)
    {
        super(int num1,int num2);
        this.additionalNum=additionalNum;
        this.opration=opration;
    }
    public void performAdvancedCalculation()
    {
      int a=num1+num2;
      System.out.println("the addition of the number is:"+a);
      int b=num1-num2;
      System.out.println("the substraction of the number is:"+b);
      int c=num1*num2;
      System.out.println("the multiplication of the number is:"+c);
      int d=num1/num2;
      System.out.println("the division of the number is:"+d);

    }
}
public class CalculationBaseTester
{
    public static void main(String[]args)
    {
        AdvancedCalculation a1=new AdvancedCalculation();
        a1.performCalculation();
        a1.performAdvancedCalculation();



    }
}