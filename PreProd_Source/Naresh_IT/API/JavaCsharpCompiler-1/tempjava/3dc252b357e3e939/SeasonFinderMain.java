import java.util.Scanner;
class HelloWorld {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        String x = sc.next();
        String s = x.toLowerCase();
        
        switch(s){
            case "january":
                System.out.println("Its Winter Season");
                break;
            case "october" :
                System.out.println("Its Rainy Season");
                break;
            case "may" :
                System.out.println("Its Summer Season");
                break;
            default :
                 System.out.println("Wrong");
        }
        
    }
}