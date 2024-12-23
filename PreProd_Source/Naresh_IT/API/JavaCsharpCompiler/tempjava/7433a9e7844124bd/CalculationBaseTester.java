package nit.test;

class CalculationBase
{
    int num1;
    int num2;
    CalculationBase()
    {
        super();
    }
    public CalculationBase(int num1,int num2)
    {
        super();
        this.num1=num1;
        this.num2=num2;
    }
    public int performCalculation(int num1,int num2)
    {
        System.out.println("Addition");
        return num1+num2;
    }
}
class AdvancedCalculation extends CalculationBase
{
    double additionalNum;
    String operation;
    AdvancedCalculation()
    {
        super();
    }
	public AdvancedCalculation(int num1,int num2,double additionalNum,String operation) {
		super();
		this.additionalNum=additionalNum;
		this.operation=operation;
	}
	public void performAdvancedCalculation(int num1, int num2,double additionalNum,String operation)
	{
		System.out.println(num1+num2+additionalNum+operation);
	
}
}

public class CalculationBaseTester {

	public static void main(String[] args) 
	{
		AdvancedCalculation add=new AdvancedCalculation();
		add.performCalculation(3,4);
		add.performAdvancedCalculation(1, 2, 3.4, "Calculation");
	}

}
