public class Test Case1 
{
    public static void main(String()args)
    {
        Scanner sc = new Scanner (System.in);
        System.out.println("enter a season :");
         String season = sc.nextInt();
         Switch(season)
         {
            case "January" :System.out.println("Its Winter Season");break;
            case "october":System.out.println("Its Rainy Season");break;
            case "may" :System.out.println("Its summer Season");break;

         }
    }
}