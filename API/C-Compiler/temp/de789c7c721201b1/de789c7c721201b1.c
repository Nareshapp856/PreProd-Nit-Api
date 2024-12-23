#include<stdio.h>
#include<math.h>
int main()
{
	int i, n1,n2,temp,c,sum,rem;
	
	
	printf("enter a two no:");
	scanf("%d%d",&n1,&n2);
	if(n1>n2){
		printf("invalid input");
		
	} 
	for( i=n1;i<=n2;i++){
	temp=i;
	c=0;
	while(temp !=0){
		temp/=10;
		c++;
	}
	temp = i;
	sum=0;
	while(temp!=0){
		rem=temp%10;
		sum+=round(pow(rem,c));
		temp/=10;
		
	}
	temp=i;
	if(sum == temp)
	printf("%4d",temp);
	}
	return 0;
}