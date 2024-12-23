class CalculationBase{
	int num1;
	int num2;
	
	public CalculationBase(int num1, int num2) {
		super();
		this.num1 = num1;
		this.num2 = num2;
	}
	
	public void performCalculation() {
		int total = num1 + num2;
		System.out.println("First num1 : "+num1);
		System.out.println("Second num2 : "+num2);
		System.out.println("Total of 1st and 2nd : "+total);
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
	
	public void performAdvancedCalculation() {
		performCalculation();
		System.out.println("Third num3 : "+additionalNum);
		double totalNum = num1 + num2 + additionalNum;
		System.out.println("Total num : "+totalNum);
		System.out.println(operation());
	}
	
	public String operation() {
		return "String Concatenation : " + num1 + num2 + additionalNum;
	}
}

public class CalculationBaseTester {
	public static void main(String []args) {
		AdvancedCalculation a = new AdvancedCalculation(100, 200, 300, "String Concatenation");
		a.performAdvancedCalculation();
	}
}