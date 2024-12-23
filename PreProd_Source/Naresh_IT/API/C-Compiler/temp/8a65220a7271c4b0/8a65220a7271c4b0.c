#include<stdio.h>
int main()
{
    int n,p=0,n=0;
    while(n!=0)
    {
        scanf("%d",&n);
        if(n>0)
        {
          p++; 
        }
        else
        {
            n++;
        }

    }
    printf("Positive numbers: %d",p);
    printf("Negative numbers: %d",n);

}