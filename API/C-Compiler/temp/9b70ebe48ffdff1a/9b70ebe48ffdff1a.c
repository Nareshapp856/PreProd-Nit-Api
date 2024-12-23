#include <stdio.h>
int main(){
    int a,c,d;
    float b,e;
    scanf("%d",&a);
    printf("Cost Price:Rs.%d")
    d=a+(3500*27/100);
    printf("Selling Price:Rs.%d",d);
    c=d-a;
    printf("Profit:Rs.%d",c);
    e=a*(12.7/100);
    printf("VAT(12.7):Rs.%d")
    b=a*(3.87/100);
    printf("Service Charge(3.87):Rs.%d",b);
    return 0;


}