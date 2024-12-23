#incllude<stdio.h>
int main()
{
    int a;
    scanf("%d",&a);
    
    a%10>=5 && printf("%d",((a/10)+1*10)) || printf("%d",(a/10)*10) || (a<0) && printf("invalid input");
    }