#include<stdio.h>
int main()
{
    int n;
    printf("Enter the value of a\n");
    scanf("%d",&n);
    
    switch(n%2)
    {
        case 0: pritnf("Even number");
        break;
        case 1: printf("Odd number");
        break;
    }
}