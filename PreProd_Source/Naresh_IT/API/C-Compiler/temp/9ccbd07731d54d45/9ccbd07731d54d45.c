#include <stdio.h>
#include<math.h>

int main() {
int n,c=1,temp,rem,sum=0;
printf("Enter number:");
scanf("%d",&n);
temp=n;
for(;n!=0;n/=10)
{
    c++;
}

for(n=temp;n!=0;n/=10)
{
    rem=n%10;
     for(int i=1;i<=c;i++){
           pow=pow*rem;//1
           c++;
       }
       sum=sum+pow;
    
}
if(sum==temp)
printf("%d is a Disarium number.",sum);
else
printf("%d is NOT a Disarium number.",sum);
    return 0;
}