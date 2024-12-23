class CalculationBase
{
    int num1;
    int num2;
    public CalculationBase(int num1,int num2)
    {
        this.num1=num1;
        this.num2=num2;
    }

    void performCalculation() 
    {
        int result=num1+num2;
        System.out.println("Result:"+result);
    }
}
class AdvancedCalculation extends  CalculationBase
{
   double additionalNum;
   String operation;

   public AdvancedCalculation(int num1,int num2,double additionalNum,String operation)
   {
    super(num1,num2);
    this.additionalNum=additionalNum;
    this.operation=operation;
   }
   void performAdvancedCalculation()
   {
     double result2=num1+num2+additionalNum;
     System.out.println("result2:"+result2);
   }
}






public class CalculationBaseTester
{
    public static void main (String[] args)
    {
         CalculationBase c=new CalculationBase(1,2);
         c.performCalculation();
         AdvancedCalculation a=new AdvancedCalculation(3,4,2.5,"+");
         a.performAdvancedCalculation();
    }
}