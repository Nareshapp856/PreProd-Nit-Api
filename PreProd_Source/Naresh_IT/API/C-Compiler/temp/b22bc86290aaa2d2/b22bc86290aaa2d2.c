#include<stido.h>
int main()
{
    int a,b,c;
    scanf("%d",&a);
    b=((a/100)*100);
    c=(((a/100)+1)*100);
    printf("Previous multiple: %d",b);
    printf("Next multiple: %d",c);
    
    return 0;
}