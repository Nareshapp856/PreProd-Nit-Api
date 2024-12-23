package Oops;

class CalculationBase{
	int num1;
	int num2;
	public CalculationBase(int num1, int num2) {
		super();
		this.num1 = num1;
		this.num2 = num2;
	}
	public void  performCalculation() {
		System.out.println(num1+num2);
	}
}

class AdvancedCalculation extends CalculationBase{
	double additionNum;
	String operation;
	public AdvancedCalculation(int num1, int num2, double additionNum, String operation) {
		super(num1, num2);
		this.additionNum = additionNum;
		this.operation = operation;
	}
	public void performAdvancedCalculation() {
		System.out.println(num1+""+operation+""+num2+"= "+(num1+num2));
		
		
	}
}
public class CalculationBaseTester {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		AdvancedCalculation ad=new AdvancedCalculation(10, 20, 0, "+");
		ad.performAdvancedCalculation();
		AdvancedCalculation sub=new AdvancedCalculation(10, 20, 0, "-");
		sub.performAdvancedCalculation();
		AdvancedCalculation mul=new AdvancedCalculation(10, 20, 0, "*");
		mul.performAdvancedCalculation();
		AdvancedCalculation div=new AdvancedCalculation(10, 20, 0, "/");
		div.performAdvancedCalculation();
		

	}

}
