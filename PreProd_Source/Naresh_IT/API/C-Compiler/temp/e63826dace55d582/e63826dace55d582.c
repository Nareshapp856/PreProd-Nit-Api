#include<stdio.h>
int main()
{
    int n;
     printf("Enter the number:");
     scanf("%d",&n);
    
   
    switch(n==1||n==2||n==3||n==4||n==5||n==6||n==7){
        case 1:printf("Monday"(valid));break;
        case 2:printf("Tuesday"(valid));break;
        case 3:printf("Wednesday"(valid));break;
        case 4:printf("Thursday"(valid));break;
        case 5:printf("Friday"(valid));break;
        case 6:printf("Saturdy"(valid));break;
        case 7:printf("Sunday"(valid));break;
        default:printf("Invalid day number.Enter number between 1 and 7.(Invalid)");break;
    }
    
    
     return 0;
}