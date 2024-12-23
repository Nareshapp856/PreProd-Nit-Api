// Online Java Compiler
// Use this editor to write, compile and run your Java code online
import java.util.*;
class SalaryCalculator{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter your Designaton");
        
        String Designation=sc.nextLine();
        int sal=0;
        if(Designation.equals("Manager")){
            sal=50000;
            }
           else if(Designation.equals("Clerk")){
            sal=30000;
            }
          else  if(Designation.equals("Watchman")){
            sal=15000;
            }
            else
            System.out.println("give right designation");
            System.out.println("Basic salary is :"+sal);
            
    }
}