#include<stdio.h>
int main()
{
    int n1,n2,sum=0;
    scanf("%d",&n1);
    scanf("%d",&n2);
    
    for(n1!=0;n1<=n2;n1++)
    {
        if(n1%2 == 0){  
            sum=sum+n1;}
    }
    }
    if(n1>n2)
    printf("Invalid range. Start number should be less than or equal to end number.");
    printf("Sum of even numbers: %d",sum);
}
