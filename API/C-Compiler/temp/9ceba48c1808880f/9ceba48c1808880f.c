#include<stdio.h>
int main()
{
    int n,pc=0,nc=0,sum=0;
    //printf("enter the series number:");scanf("%d",&n);
scanf("%d",&n);
    for(int i=0;i<n;i++)
    {
    if(n<0)
{
    //printf("this is negative number");
    nc++;
    sum=sum+pc;
}else{
    np++;
}
printf("Positive numbers:%d",pc);
printf("Negative numbers:%d",nc);
}
}