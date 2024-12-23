#include<stdio.h>
int main()
{
    int addition,substraction,multiplication,division ;
    printf("enter any operator");
    scanf("%d %d",&num1,&num2);
    printf("addition:%d+%d=%d\n",&num1,&num2,num1+num2);
    printf("substraction:%d-%d=%d\n",&num1,&num2,num1-num2);
    printf("multiplication:%d*%d=%d\n",&num1,&num2,num1*num2);
    printf("division:%d/%d=%d",&num1,&num2,num1/num2);
    return 0;

}