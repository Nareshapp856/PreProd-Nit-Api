#include<stdio.h>
int main()
{
 int month;
  printf("enter month");
  scanf("%d",&month);
if(mon==1||mon==3||month==5||mon==7||mon==8||mon==10||mon==12)
{
  printf("31 days");  
}
else if(mon==4||mon==6||mon==9||mon==11)
{
  printf("30 days"); 
}
else if(month==2)
{
 printf("depending on leap year");   
}
else if
{
    printf(" invalid month number");
}
return 0;

}