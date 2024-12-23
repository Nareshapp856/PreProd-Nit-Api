#include<stdio.h>
int main()
{
    int costprice;
    scanf("%d",&costprice);
    sellingprice=costprice+(27%costprice);
    profit=sellingprice-costprice;
    vat=12.7%sellingprice;
    servicecharge=3.87%sellingprice;
    printf("Cost Price:%d",Cost Price);
    printf("Selling Price:%d",Selling Price);
    printf("Profit:%d",Profit);
    printf("VAT:%d",VAT);
    printf("Service Charge:%d",Service Charge);
    return 0;
}