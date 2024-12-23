class Calculation{
    int num1;
    int num2;

    Calculation(int x,int y){
        num1=x;
        num2=y;
    }
  public void  performCalculation() {
    System.out.println("Sum of the two numbers is : "+num1+num2);
  }
}

class AdvancedCalculation extends Calculation{
    double additionalNum;
    String operation;
    int x;
    int y;

    AdvancedCalculation(int x,int y,double additionalNum,String operation){
        super(x,y);
        this.additionalNum=additionalNum;
        this.operation=operation;
        this.x=x;
        this.y=y;
    }

    public void performAdvancedCalculation(){
        System.out.println(x+y+additionalNum+operation);
    }
}


public class CalculationBaseTester{
    public static void main(String args[]){

        AdvancedCalculation ac = new AdvancedCalculation(5,6,29.5,"Addition");
        ac.performCalculation();
    }
}