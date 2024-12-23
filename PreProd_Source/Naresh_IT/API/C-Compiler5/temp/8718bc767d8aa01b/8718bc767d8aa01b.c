#include<stdio.h>
int main()
{
    int a[100];int i,j,n,ele,pos,swap;
    printf("enter the array:");
    for(i=0;i<0;i++)
    scanf("%d",&n);
    printf("enter the %d elements:",n);
    scanf("%d",&ele);
    for(i=0;i<n;i++)
    {
        for(j=0;j<n-1;j++)
        if(a[i]<=a[j]) {swap=a[i]; a[i]=a[j];a[i]=swap;
        printf("swap the elements:",pos);
    }
}