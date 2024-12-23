#include<stdio.h>
int main()
{
    int n1,n2,es=0;
    scanf("%d%d",&n1,&n2);
    if(n1%2!=0&&n2%2!=0)
    {
        printf("Sum of even numbers: 0")
    }
    return ;
    if(n1<n2)
    {
    //for(;n1<=n2;n1++)
    while(n1<=n2)
    {
        if(n1%2==0)
        {
            es=es+n1;
        }
        n1++;
    }
    printf("Sum of even numbers: %d",es);
    }
    else
    {
        printf("Invalid range. Start number should be less than or equal to end number.");
    }
}