#include<stdio.h>
#include<string.h>
int main()
{
    int i,j;
    char s[100];
    gets(s);
    int len=strlen(s);
    if(len==1)printf("%d",arr[0]);
    for(i=0;i<=len;i++)
    {
        for(j=i+1;j<=len;j++)
        {
            if(s[j]==' ' || j==len-1)
            {
                for(int x=j;x>=i;x--)
                {
                    //if(s[i]!=' ')
                    printf("%c",s[x]);
                }
                 i=j;
            }
           
        }
    }
}