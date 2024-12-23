#include<stdio.h>

int main()
{
    int num,i,c=0;
    scanf("%d",&num)
    if(num>0)
    {
    for(i=1;i<=num;i++)
    {
        if(num%i==0)
        {
            c++;
        }
    }
    if(c==2)
    {
        printf("%d is a prime number",num);
    }
    else
    {
        printf("%d is not a prime number",num);
    }
    }
    else
    {
        printf("Invalid input. Enter a positive integer.");
    }
    return 0;
}