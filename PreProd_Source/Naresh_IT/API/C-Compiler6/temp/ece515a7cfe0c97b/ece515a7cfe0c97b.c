#include<stdio.h>
int main()
{
	int a[]={1,2,3,4,5};
	int l=sizeof(a)/sizeof(int);
	rotateRight(a,l,3);	
	for(int i=0;i<l;i++)
	{
		printf("%d ",a[i]);
	}
}

void rotateRight(int *a, int l, int p)
{	 
	 	for(int k=1;k<=p;k++)
	 	{
	 		int t= *(a+l-1); 
		 for(int i=l-1;i>=0;i--)
		 {
		 	(a+i)=(a+i-1);
		 }
		  
		 *(a+0)=t;
		}
}