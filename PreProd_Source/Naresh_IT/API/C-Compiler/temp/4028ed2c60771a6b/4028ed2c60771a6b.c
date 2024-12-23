#include<stdio.h>
int main()
{
    int s,a;
    printf("enter the number");
    scanf("%d",&a);
    s=a*a;
    while(s>=a)
    {
    if(s%10)
    printf("%d is an automorphic number",a);
    else if(s%100)
    printf("%d is an automorphic number",a);
    else if(s==0)
    printf("")
    else printf("0 is an automorphic number.");
    }

}