public class CalculationBaseTester {
	public static void main(String args[]) {
	AdvancedCalculation obj1=new AdvancedCalculation(2,3,5,"addition");
	System.out.println("sum= "+ obj1.performCalculation());
	System.out.println("sum2= "+obj1.AdvancedCalculation());
	}
	
	
	
	

}
class Base{
	int num1;
	int num2;
	Base(int num1,int num2){
	 this.num1=num1;
	 this.num2=num2;
	 }
	public int performCalculation() {
		int result=num1+num2;
		return result;
		
	}
	
	
	
}
class AdvancedCalculation extends Base{
	double additionalNum;
	String operation;
	AdvancedCalculation(int num1,int num2,double additionalNum,
	String operation){
		super(num1,num2);
		this.additionalNum=additionalNum;
		this.operation=operation;
		
	}
	public String AdvancedCalculation() {
		String result=num1+num2+additionalNum+operation;
		return result;
		
	}
	
	
	
	}