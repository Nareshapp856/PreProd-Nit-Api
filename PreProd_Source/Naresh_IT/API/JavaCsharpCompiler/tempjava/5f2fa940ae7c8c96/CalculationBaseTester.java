class CalculationBase
{
    int num1;
    int num2;

    CalculationBase(int num1,int num2)
    {
        this.num1=num1;
        this.num2=num2;
    }

    public void performCalculation()
    {
        System.out.println("Sum of "+num1+" And "+num2+" is:"+(num1+num2));
    }
}

class AdvancedCalculation extends CalculationBase
{
    double additionalNum;
    String operation;

    AdvancedCalculation(int num1,int num2,double additionalNum,String operation)
    {
        super(num1,num2);
        this.additionalNum=additionalNum;
        this.operation=operation;
    }

    public void performAdvancedCalculation()
    {
        super.performCalculation();
        switch(operation)
        {
            case "+":System.out.println("Sum:"+(num1+num2+additionalNum));break;
            case "-":System.out.println("Sub:"+(num1-num2-additionalNum));break;
            case "/":System.out.println("Division:"+(num1/num2/additionalNum));break;
            case "%":System.out.println("Remainder:"+(num1%num2%additionalNum));break;
            case "*":System.out.println("Remainder:"+(num1*num2*additionalNum));break;
            default:System.out.println("Invalid operation");
        }
    }
}

class CalculationBaseTester
    {
        public static void main(String args[])
        {
            AdvancedCalculation ad=new AdvancedCalculation(50,20,30,"*");
            ad.performAdvancedCalculation();
        }
    }
