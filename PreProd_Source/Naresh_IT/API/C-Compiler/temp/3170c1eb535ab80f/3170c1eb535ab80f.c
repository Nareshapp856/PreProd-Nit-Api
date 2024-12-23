
#include <stdio.h>

int main() {
    int n;
    scanf("%d"&n)
    
    if(n==1)
    {
        printf("Monday");
    }
    
    else   if(n==2)
    {
        printf("Tusday");
    }
    
     else   if(n==3)
    {
        printf("Wenday");
    }
     else   if(n==4)
    {
        printf("Thusday");
    }
     else   if(n==5)
    {
        printf("Friday");
    }
     else   if(n==6)
    {
        printf("saturday");
    }
     else   if(n==7)
    {
        printf("sunday");
    }
    else
    {
        printf("Invalid day number. Enter a number between 1 and 7.")
    }
    

    return 0;
}