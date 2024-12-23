#include <stdio.h>
#include <string.h>
int isprime(int size, char *ch)
{
    int range = size;
    for (int i = 2; i < range; i++)
    {
        int prime = 1;
        for (int j = 2; j < i; j++)
        {
            if (i % j == 0)
            {
                prime = 0;
                break;
            }
        }
        if (prime == 1)
            printf("%c", ch[i]);
    }
}
int main(int argc, char const *argv[])
{
    char str[];
    for(int i=0;i<n;i++){
        gets(str);
    }
    int size = sizeof(str);
    isprime(size, str);
    return 0;
}
