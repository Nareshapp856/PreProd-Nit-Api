class CalculationBase
{
    int num1;
    int num2;

    public CalculationBase(int num1, int num2)
    {
        this.num1=num1;
        this.num2=num2;
    }

    public void performCalculation()
    {
        System.out.Println("Sum: "+(num1+num2));
    }
}

class AdvancedCalculation extends CalculationBase
{
    double additionalNum;
    String operation;

    public AdvancedCalculation(int num1, int num2)
    {
        super(num1, num2);
        this.num1=num1;
        this.num2=num2;
    }

    public AdvancedCalculation(int num1, int num2, double additionalNum, String operation)
    {
        super(num1, num2);
        this.additionalNum=additionalNum;
        this.operation=operation;
    }

    public void performAdvancedCalculation()
    {
        if(operation=="+")
        {
            System.out.println("Addition of two number: "+(additionalNum+additionalNum));
        }

        if(operation=="-")
        {
            System.out.println("Subtraction of two number: "+(additionalNum-additionalNum));
        }
        if(operation=="*")
        {
            System.out.println("Multiplication of two number: "+(additionalNum*additionalNum));
        }
        if(operation=="/")
        {
            System.out.println("Division of two number: "+(additionalNum/additionalNum));
        }

    }
}

public class CalculationBaseTester
{
   public static void main(String []args)
   {
    AdvancedCalculation C1= new AdvancedCalculation(2,3,4,"+")
    System.out.Println("C1.performCalculation");
    System.out.Println("C1.performAdvancedCalculation");
   } 
}