#include<stdio.h>
int main()
{
    int n;
    int sp;
    int vat;
     
    scanf("%d",&n);
    printf("Cost Price: Rs.%d.00\n",n);
   int  profit=n*27/100;
    sp=n+profit;
   printf("Selling Price: Rs.%d.00\n",sp);
   printf("Profit: Rs.%d.00",profit);

vat=12.7/100*4445;
print("VAT (12.7): Rs.%d",vat);
}