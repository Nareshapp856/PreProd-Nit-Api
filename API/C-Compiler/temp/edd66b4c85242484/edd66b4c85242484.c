#include(stdio.h)
int main()
{
    float a,b;
    printf("Enter the a,b values\n")
    scanf("%f %f\n",&a,&b);
    printf("Addition of %f and %f is %f\n",a+b);
    printf("Subtraction of %f and %f is %f\n",a-b);
    printf("Multiplication of %f and %f is %f\n",a*b);
    printf("Divison of %f and %f is %f\n",a/b);
    return 0;
}