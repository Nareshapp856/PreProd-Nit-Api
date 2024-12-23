#include<stdio.h>
int square(int n)
{
    n*n;
}
int main()
{
    printf("enter a number:");
    scanf("%d &number");
    int result=square(number);
    printf("the number of the square is: %d\n",result,number);
    return 0;
}