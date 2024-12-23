class CalculationBase{
	int num1;
	int num2;
	public CalculationBase(int num1, int num2) {
		super();
		this.num1 = num1;
		this.num2 = num2;
	}
	void performCalculation() {
		System.out.println("Add :"+(num1+num2));
	}
}
class AdvancedCalculation extends CalculationBase{
	double additionalNum;
	String operation;
	public AdvancedCalculation(int num1, int num2, double additionalNum, String operation) {
		super(num1, num2);
		this.additionalNum = additionalNum;
		this.operation = operation;
	}
	void performAdvancedCalculation()
	{
		System.out.println(num1+operation+num2+operation+additionalNum+"="+(num1+num2+additionalNum));
	}
}
public class CalculationBaseTester {

	public static void main(String[] args) {
		AdvancedCalculation obj=new AdvancedCalculation(10,20,1.2,"+");
		obj.performCalculation();
		obj.performAdvancedCalculation();
		
		}

}
