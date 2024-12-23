// #include <stdio.h>

// int main() {
//     char str[100];         
//     int i, j;              
//     char f = '\0'; 
//     printf("Enter a string: ");
//     scanf(" %[^\n]s", str); 
//     for (i = 0; str[i] != '\0'; i++) 
//     {
//         for (j = i + 1; str[j] != '\0'; j++) 
//         {
//             if (str[i] == str[j] && str[i] != ' ') 
//             { 
//                 f = str[i]; 
//             }
//         }
//     }
//     if (f!= '\0')
//     {
//         printf("The last repetitive character is: %c\n",f);
//     } 
//     else 
//     {
//         printf("No repeated characters found.\n");
//     }
//     return 0;
// }