#include <stdio.h>
 main(){
    int a,c,d;
    float b,e;
    scanf("%d",&a);
    printf("Cost Price:Rs.%d\n",a);
    d=a+(a*27/100);
    printf("Selling Price:Rs.%d\n",d);
    c=d-a;
    printf("Profit:Rs.%d\n",c);
    e=d*(12.7/100);
    printf("VAT(12.7):Rs.%d\n",e);
    b=*d;
    printf("Service Charge(3.87):Rs.%d\n",b);
    return 0;


}