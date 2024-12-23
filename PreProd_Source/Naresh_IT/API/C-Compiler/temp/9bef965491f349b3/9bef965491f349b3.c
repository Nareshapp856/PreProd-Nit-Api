#include<stdio.h>
int main()
{
    int a,b,c;
    scanf("%d %d %d",&a,&b,&c);
    int (a>b&&a>c)&&printf("%d",a);
    int (b>c&&b>a)&&printf("%d",b);
    int (c>a&&c>b)&&printf("%d",c);
    // printf("%d",a);
    // printf("%d",b);
    // printf("%d",c);
    return 0;
}