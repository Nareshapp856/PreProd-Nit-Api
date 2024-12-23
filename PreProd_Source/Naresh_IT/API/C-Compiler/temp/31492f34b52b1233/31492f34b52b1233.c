#include<stdio.h>
#include<math.h>

int main()
{
    int n,m,s=0,c;
    scanf("%d",&n);


for(m=n;m!=0;m=m/10)c++;
for(m=n;m!=0;m=m/10)
{
r=m%10;
s+=pow(r,c);

}
if(n==s)printf("%d is an Amstrong number",n);
else printf("%d is not an Amstrong number",n);
}