#include <stdio.h>
int isprime(int n)
int main()
{
    char s[20];
    int i;
    printf("enter the string:");
    gets(s);
    for(i=2;s[i]<=n/2;i++)
    {
        if(n%i==0)
        return 0;
    }
    return 1;
    {
        for(i=0;s[i];i++)
        {
            if(isprime(i))
            {
                printf("%c",s[i]);
            }
        }
    }
}    
   
    
  