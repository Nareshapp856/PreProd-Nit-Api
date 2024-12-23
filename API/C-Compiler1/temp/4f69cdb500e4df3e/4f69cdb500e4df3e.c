
#include<stdio.h>
int rev(int n);
int isPrime(int n);
int main()
{
    int n;
    // printf("Enter the Size of array : ");
    scanf("%d",&n);

    int i,arr[100];
    // printf("Array elements: ");
    for(i=0; i<n; i++)
    {
        scanf("%d",&arr[i]);
    }

   
    for(i=0; i<n; i++)
    {
        if(isPrime(arr[i]) && isPrime(rev(arr[i])))
        {
            printf("%d ",arr[i]);
            
        }
        elements{
            printf("No twisted prime fond");
        }
    }
   
}


int isPrime(int n)
{
    int count=0;
    for(int i=1; i<=n; i++)
    {
        if(n%i==0)
        {
            count++;
        }
    }
    return count==2;
}

int rev(int n)
{
    int r=0;
    while(n!=0)
    {
        r=r*10+(n%10);
        n/=10;
    }
    return r;
}
