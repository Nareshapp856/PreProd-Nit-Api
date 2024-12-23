#include<stdio.h>
int main(){
	int p,c,b,m,cs,t;
	float percentage;
	scanf("%d",&p);
	scanf("%d",&c);
	scanf("%d",&b);
	scanf("%d",&m);
	scanf("%d",&cs);
	t=p+c+b+m+cs;
	percentage=(t*100)/500;
    if(p>35)printf("Fail")
	printf("Total Marks: %d\n",t);
	printf("percentage: %.2f%%\n",percentage);
	
	if(percentage>=90)printf("Grade A");
	else if(percentage>=80)printf("Grade B");
	else if(percentage>=70)printf("Grade C");
	else if(percentage>=60)printf("Grade D");
	else if(percentage>=40)printf("Grade E");
	else printf("Grade F");
}