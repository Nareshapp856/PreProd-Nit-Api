#include <stdio.h>

int main()
    {
        char s[100];
        int i,j,n;

printf("Enter the string: ");
        gets(s);

for(i=0;s[i];i++)
n=i;

for(i=0;i<n;i++)
{
    for(j=1,c=0;j<i/2;j++)
    {
        c++;
    }
    if(c==2)
    {
        puts(s);
    }
}
    }